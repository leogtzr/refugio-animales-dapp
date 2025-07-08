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
            setAmount(""); // Limpiar el campo después de donar
        } catch (e) {
            alert("Error al donar: " + (e as any).message);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Cantidad en ETH"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
            <button
                onClick={donate}
                disabled={loading || !amount}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
            >
                {loading ? "Donando..." : "Donar"}
            </button>
            {txHash && (
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded border">
                    ✅ Donación enviada:{" "}
                    <a 
                        href={`https://sepolia.etherscan.io/tx/${txHash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-green-800"
                    >
                        {txHash.slice(0, 10)}...
                    </a>
                </div>
            )}
        </div>
    );
}