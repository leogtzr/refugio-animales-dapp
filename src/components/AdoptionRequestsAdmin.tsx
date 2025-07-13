"use client";
import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

export default function AdoptionRequestsAdmin({ animalId }: { animalId: number }) {
    const { signer, address } = useWallet();
    const contract = useContract(signer);
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!contract || !animalId) return;
            setLoading(true);
            try {
                const reqs = await contract.getAdoptionRequests(animalId);
                setRequests(reqs);
            } catch (e) {
                setRequests([]);
            }
            setLoading(false);
        };
        fetchRequests();
    }, [contract, animalId]);

    const approve = async (idx: number) => {
        if (!contract) return;
        try {
            const tx = await contract.approveAdoption(animalId, idx);
            await tx.wait();
            alert("Adopción aprobada");
        } catch (e) {
            alert("Error al aprobar: " + (e as any).message);
        }
    };

    if (loading) return <div>Cargando solicitudes...</div>;
    if (requests.length === 0) return <div>No hay solicitudes.</div>;

    return (
        <div className="mt-4">
            <h4 className="font-bold mb-2">Solicitudes de adopción</h4>
            <ul className="space-y-2">
                {requests.map((r, idx) => (
                    <li key={idx} className="border rounded p-2">
                        <div><b>Nombre:</b> {r.fullName}</div>
                        <div><b>Email:</b> {r.email}</div>
                        <div><b>Teléfono:</b> {r.phone}</div>
                        <div><b>Dirección:</b> {r.requesterAddress}</div>
                        <div><b>Experiencia:</b> {r.experience}</div>
                        <div><b>Fecha:</b> {new Date(Number(r.requestDate) * 1000).toLocaleString()}</div>
                        <div>
                            {r.processed ? (
                                r.approved ? <span className="text-green-700">Aprobada</span> : <span className="text-red-700">Rechazada</span>
                            ) : (
                                <button
                                    onClick={() => approve(idx)}
                                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                >
                                    Aprobar
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}