"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { formatEther } from "ethers";

export default function AnimalDetail() {
    const router = useRouter();
    const params = useSearchParams();
    const animalId = Number(params.get("id"));
    const { address } = useWallet();
    const contract = useContract();
    const [animal, setAnimal] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimal = async () => {
            if (!contract || !animalId) return;
            setLoading(true);
            try {
                const data = await contract.getAnimal(animalId);
                setAnimal(data);
            } catch (e) {
                setAnimal(null);
            }
            setLoading(false);
        };
        fetchAnimal();
    }, [contract, animalId]);

    if (loading) return <div>Cargando...</div>;
    if (!animal) return <div>No se encontró el animal.</div>;

    const images = (animal.ipfsHashes || []).map(
        (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash}`
    );

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <button onClick={() => router.back()} className="mb-4 text-blue-600 underline">← Volver</button>
            <h2 className="text-2xl font-bold mb-2">{animal.name}</h2>
            <div className="mb-4">
                <span className="font-medium">Especie:</span> {animal.species} <br />
                <span className="font-medium">Edad:</span> {animal.age} meses <br />
                <span className="font-medium">Raza:</span> {animal.breed} <br />
                <span className="font-medium">Descripción:</span> {animal.description}
            </div>
            <div className="mb-4">
                <span className="font-medium">Donaciones recibidas:</span> {formatEther(animal.donationsReceived)} ETH
            </div>
            <div className="mb-4 flex gap-2">
                {images.map((src: string, idx: number) => (
                    <img key={idx} src={src} alt={animal.name} className="w-32 h-32 object-cover rounded" />
                ))}
            </div>
            {/* Add more details? / history, requests, etc */}
        </div>
    );
}