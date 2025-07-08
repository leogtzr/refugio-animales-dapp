"use client";
import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

export default function DonateToAnimal({ animalId }: { animalId: number }) {
    const { signer } = useWallet();
    const contract = useContract(signer);
    const [amount, setAmount] = useState("");
    const [txHash, setTxHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const donate = async () => {
        if (!signer || !amount) return;
        setLoading(true);
        try {
            const tx = await contract.donateToAnimal(animalId, {
                value: BigInt(Number(amount) * 1e18),
            });
            await tx.wait();
            setTxHash(tx.hash);
        } catch (e) {
            alert("Error al donar: " + (e as any).message);
        }
        setLoading(false);
    };

    return (
        <div className="mt-2">
            <input
                type="number"
                min="0"
                step="0.01"
                placeholder="ETH"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="border px-2 py-1 rounded mr-2"
            />
            <button
                onClick={donate}
                disabled={loading}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
                {loading ? "Donando..." : "Donar"}
            </button>
            {txHash && (
                <div className="text-xs text-gray-500 mt-1">
                    Donación enviada: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash.slice(0, 10)}...</a>
                </div>
            )}
        </div>
    );
}