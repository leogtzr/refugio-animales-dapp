"use client";
import { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

export default function RegisterAnimalForm() {
    const { signer, address } = useWallet();
    const contract = useContract(signer);

    const [form, setForm] = useState({
        name: "",
        age: "",
        species: "",
        breed: "",
        description: "",
        ipfsHashes: "",
    });
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [isOwner, setIsOwner] = useState<boolean | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Check if Owner...
    useEffect(() => {
        const checkOwner = async () => {
            if (contract && address) {
                try {
                    const owner = await contract.owner();
                    setIsOwner(owner.toLowerCase() === address.toLowerCase());
                } catch {
                    setIsOwner(false);
                }
            }
        };
        checkOwner();
    }, [contract, address]);

    // Remove messages after a few secs
    useEffect(() => {
        if (successMsg || errorMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg(null);
                setErrorMsg(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successMsg, errorMsg]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);
        try {
            const ipfsArr = form.ipfsHashes.split(",").map(s => s.trim()).filter(Boolean);
            const tx = await contract.registerAnimal(
                form.name,
                Number(form.age),
                form.species,
                form.breed,
                form.description,
                ipfsArr
            );
            await tx.wait();
            setTxHash(tx.hash);
            setSuccessMsg("¡Animal registrado exitosamente!");
            setForm({
                name: "",
                age: "",
                species: "",
                breed: "",
                description: "",
                ipfsHashes: "",
            });
        } catch (e: any) {
            setErrorMsg("Error: " + (e?.reason || e?.message));
        }
        setLoading(false);
    };

    if (isOwner === false) {
        /*
        return (
            <div className="border rounded p-4 mb-8 bg-yellow-50 text-yellow-800">
                <strong>Solo el owner del contrato puede registrar animales.</strong>
                <div className="text-xs mt-2">Conéctate con la cuenta que desplegó el contrato para acceder a esta función.</div>
            </div>
        );
        */
       return (
        <></>
       )
    }

    if (isOwner === null) {
        return (
            <div className="border rounded p-4 mb-8 bg-gray-50 text-gray-500">
                Verificando permisos...
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border rounded p-6 mb-8 bg-gray-50 shadow">
            <h2 className="text-xl font-bold mb-4 text-green-700">Registrar nuevo animal 🐶🐱</h2>
            {successMsg && (
                <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-300 animate-fade-in">
                    {successMsg}
                    {txHash && (
                        <div className="text-xs mt-1">
                            <span>Tx: </span>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {txHash.slice(0, 10)}...
                            </a>
                        </div>
                    )}
                </div>
            )}

            {errorMsg && (
                <div className="mb-4 px-4 py-2 rounded bg-red-100 text-red-800 border border-red-300 animate-fade-in">
                    {errorMsg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Nombre</label>
                    <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="border px-2 py-1 rounded w-full text-black" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Edad (meses)</label>
                    <input name="age" type="number" placeholder="Edad" value={form.age} onChange={handleChange} className="border px-2 py-1 rounded w-full bg-white text-black" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Especie</label>
                    <input name="species" placeholder="Especie" value={form.species} onChange={handleChange} className="border px-2 py-1 rounded w-full bg-white text-black" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Raza</label>
                    <input name="breed" placeholder="Raza" value={form.breed} onChange={handleChange} className="border px-2 py-1 rounded w-full bg-white text-black" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-black">Descripción</label>
                    <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="border px-2 py-1 rounded w-full bg-white text-black" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-black">IPFS Hashes (separados por coma)</label>
                    <input name="ipfsHashes" placeholder="Qm...,Qm...,Qm..." value={form.ipfsHashes} onChange={handleChange} className="border px-2 py-1 rounded w-full bg-white text-black" />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                {loading ? "Registrando 🐾..." : "Registrar 🐾"}
            </button>
        </form>
    );
}