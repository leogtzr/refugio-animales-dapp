"use client";
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { useContract } from "../../hooks/useContract";
import { ethers, formatEther } from "ethers";
import Link from "next/link";

const STATUS_LABELS = [
    "Disponible",
    "En proceso de adopción",
    "Adoptado",
    "Fallecido",
];

export default function AdminConsole() {
    const { signer, address } = useWallet();
    const contract = useContract(signer || undefined);
    const [isOwner, setIsOwner] = useState(false);
    const [balance, setBalance] = useState<string | null>(null);
    const [animals, setAnimals] = useState<any[]>([]);
    const [statusCounts, setStatusCounts] = useState<number[]>([0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [newStatus, setNewStatus] = useState<number>(0);

    useEffect(() => {
        console.log("signer", signer);
        console.log("contract", contract);
    }, [signer, contract]);

    useEffect(() => {
        if (contract) {
            console.log("contract.target", contract.target);
        }
        if (animals) {
            console.log(animals);
        }
    }, [contract]);

    useEffect(() => {
        const fetchData = async () => {
            if (!contract || !address || !contract.target) return;
            setLoading(true);
            setError(null);
            try {
                const owner = await contract.owner();
                if (owner.toLowerCase() !== address.toLowerCase()) {
                    setIsOwner(false);
                    setLoading(false);
                    return;
                }
                setIsOwner(true);

                // Balance del contrato
                let provider;
                if (contract.runner && contract.runner.provider) {
                    provider = contract.runner.provider;
                } else if (window.ethereum) {
                    provider = new ethers.BrowserProvider(window.ethereum);
                } else {
                    throw new Error("No provider disponible");
                }
                const contractAddress = contract.target;
                const bal = await provider.getBalance(contractAddress);
                setBalance(formatEther(bal));

                // Animales
                const total = await contract.getTotalAnimals();
                const animalsArr = [];
                const statusArr = [0, 0, 0, 0];
                for (let i = 1; i <= total; i++) {
                    try {
                        const animal = await contract.getAnimal(i);
                        console.log(animal);
                        if (animal.exists) {
                            animalsArr.push({ 
                                ...animal, 
                                id: i, 
                                name: animal[1], 
                                status: animal[10],
                                donationsReceived: animal[8]
                            });
                            statusArr[Number(animal.status)]++;
                        }
                    } catch (e) {
                        console.log(e);     // or ignore for now... empty animal?
                    }
                }
                setAnimals(animalsArr);
                setStatusCounts(statusArr);
            } catch (e: any) {
                setError(e.message || "Error al cargar datos");
            }
            setLoading(false);
        };
        fetchData();
    }, [contract, address]);

    // Change Animal status
    const handleStatusChange = (animalId: number, status: number) => {
        setUpdatingId(animalId);
        setNewStatus(status);
    };

    const handleUpdateStatus = async (animalId: number) => {
        if (!contract) return;
        try {
            const tx = await contract.updateAnimalStatus(animalId, newStatus);
            await tx.wait();
            setUpdatingId(null);
            // Refresh data
            const updatedAnimals = animals.map((a) =>
                a.id === animalId ? { ...a, status: newStatus } : a
            );
            setAnimals(updatedAnimals);
            const statusArr = [0, 0, 0, 0];
            updatedAnimals.forEach((a) => statusArr[Number(a.status)]++);
            setStatusCounts(statusArr);
        } catch (e: any) {
            alert("Error al actualizar estado: " + (e.reason || e.message));
        }
    };

    if (loading) return <div className="p-8">Cargando consola de administración...</div>;
    if (!isOwner)
        return (
            <div className="p-8 text-red-600">
                No tienes permisos para acceder a esta consola.
                <Link href="/" className="ml-4 underline text-blue-700">Volver al inicio</Link>
            </div>
        );
    if (error)
        return (
            <div className="p-8 text-red-600">
                Error: {error}
                <Link href="/" className="ml-4 underline text-blue-700">Volver al inicio</Link>
            </div>
        );

    return (
        <main className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Consola de Administración</h1>
                <Link href="/" className="text-blue-700 underline">Volver al inicio</Link>
            </div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded p-4">
                    <div className="text-sm text-gray-500">Balance del contrato</div>
                    <div className="text-xl font-bold text-black">{balance} ETH</div>
                </div>
                <div className="bg-gray-100 rounded p-4">
                    <div className="text-sm text-gray-500">Animales registrados</div>
                    <div className="text-xl font-bold text-black">{animals.length}</div>
                </div>
                <div className="bg-gray-100 rounded p-4">
                    <div className="text-sm text-gray-500">Por estado</div>
                    <ul className="text-sm mt-2 space-y-1">
                        {STATUS_LABELS.map((label, idx) => (
                            <li key={idx}>
                                <span className="font-medium text-black">{label}:</span> <span className="text-black">{statusCounts[idx]} </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <h2 className="text-lg font-bold mt-8 mb-4">Animales</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nombre</th>
                            <th className="p-2 border">Estado</th>
                            <th className="p-2 border">Recabado</th>
                            <th className="p-2 border">Cambiar estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animals.map((animal) => (
                            <tr key={animal.id}>
                                <td className="p-2 border">{animal.id}</td>
                                <td className="p-2 border text-white">{animal.name}</td>
                                <td className="p-2 border text-white">{STATUS_LABELS[Number(animal.status)]}</td>
                                <td className="p-2 border text-white">
                                    {formatEther(animal.donationsReceived || 0)} ETH
                                </td>
                                <td className="p-2 border">
                                    {updatingId === animal.id ? (
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(Number(e.target.value))}
                                                className="border rounded px-2 py-1"
                                            >
                                                {STATUS_LABELS.map((label, idx) => (
                                                    <option key={idx} value={idx}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleUpdateStatus(animal.id)}
                                                className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setUpdatingId(null)}
                                                className="text-gray-500 underline"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleStatusChange(animal.id, Number(animal.status))}
                                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            Cambiar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}