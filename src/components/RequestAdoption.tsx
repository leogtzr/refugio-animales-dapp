"use client";
import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

export default function RequestAdoption({ animalId }: { animalId: number }) {
  const { signer } = useWallet();
  const contract = useContract(signer);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const request = async () => {
    setLoading(true);
    try {
      const tx = await contract.requestAdoption(
        animalId,
        form.name,
        form.email,
        form.phone,
        form.address,
        form.experience
      );
      await tx.wait();
      setTxHash(tx.hash);
    } catch (e) {
      alert("Error al solicitar adopción: " + (e as any).message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <input name="name" placeholder="Nombre" onChange={handleChange} className="border px-2 py-1 rounded mr-2 mb-1" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border px-2 py-1 rounded mr-2 mb-1" />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} className="border px-2 py-1 rounded mr-2 mb-1" />
      <input name="address" placeholder="Dirección" onChange={handleChange} className="border px-2 py-1 rounded mr-2 mb-1" />
      <input name="experience" placeholder="Experiencia" onChange={handleChange} className="border px-2 py-1 rounded mr-2 mb-1" />
      <button
        onClick={request}
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        {loading ? "Enviando..." : "Solicitar Adopción"}
      </button>
      {txHash && (
        <div className="text-xs text-gray-500 mt-1">
          Solicitud enviada: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash.slice(0, 10)}...</a>
        </div>
      )}
    </div>
  );
}