"use client";
import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

interface AdoptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    animalId: number;
    animalName: string;
}

export default function AdoptionModal({ isOpen, onClose, animalId, animalName }: AdoptionModalProps) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            // Reset form after successful submission
            setForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                experience: "",
            });
        } catch (e) {
            alert("Error al solicitar adopción: " + (e as any).message);
        }
        setLoading(false);
    };

    const handleClose = () => {
        setTxHash(null);
        setForm({
            name: "",
            email: "",
            phone: "",
            address: "",
            experience: "",
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Solicitar Adopción - {animalName}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {txHash ? (
                        <div className="text-center py-8">
                            <div className="text-green-600 text-lg font-semibold mb-4">
                                ¡Solicitud enviada exitosamente! 🎉
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                                Tu solicitud de adopción ha sido enviada a la blockchain.
                            </div>
                            <div className="text-xs text-gray-500 mb-4">
                                Transacción:{" "}
                                <a
                                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {txHash.slice(0, 10)}...
                                </a>
                            </div>
                            <button
                                onClick={handleClose}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre completo *
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Tu nombre completo"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono *
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Tu número de teléfono"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección *
                                </label>
                                <input
                                    name="address"
                                    type="text"
                                    placeholder="Tu dirección completa"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experiencia con mascotas *
                                </label>
                                <textarea
                                    name="experience"
                                    placeholder="Cuéntanos sobre tu experiencia con mascotas..."
                                    value={form.experience}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? "Enviando..." : "Solicitar Adopción"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}