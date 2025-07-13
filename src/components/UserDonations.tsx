"use client";
import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { formatEther } from "ethers";

export default function UserDonations() {
    const { address } = useWallet();
    const contract = useContract();
    const [donations, setDonations] = useState<{ animalId: number, amount: string, name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDonations = async () => {
            if (!contract || !address) return;
            setLoading(true);
            try {
                const animalIds: number[] = await contract.getUserDonations(address);
                const donationMap: { [id: number]: number } = {};
                animalIds.forEach(id => {
                    donationMap[id] = (donationMap[id] || 0) + 1;
                });
                const uniqueIds = [...new Set(animalIds)];
                const result = [];
                for (const id of uniqueIds) {
                    const animal = await contract.getAnimal(id);
                    result.push({
                        animalId: id,
                        name: animal.name,
                        amount: formatEther(animal.donationsReceived || 0)
                    });
                }
                setDonations(result);
            } catch (e) {
                setDonations([]);
            }
            setLoading(false);
        };
        fetchDonations();
    }, [contract, address]);

    if (!address) {
        return null;
    }
    if (loading) {
        return <div className="mb-4">Cargando tus donaciones...</div>;
    }
    if (donations.length === 0) {
        return <div className="mb-4">No has realizado donaciones aún.</div>;
    }

    return (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-bold mb-2 text-blue-700">Tus Donaciones 🙏🏻</h3>
            <ul className="space-y-1">
                {donations.map((d, i) => (
                    <li key={i}>
                        <span className="font-semibold text-black">{d.name}</span> <span className="text-black">— {d.amount} ETH</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}