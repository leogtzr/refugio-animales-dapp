"use client";
import { useAnimals } from "../hooks/useAnimals";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import DonateToAnimal from "./DonateToAnimal";
import AdoptionModal from "./AdoptionModal";

function getStatusBadge(status: number) {
    switch (status) {
        case 0:
            return (
                <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">
                    🟢 Disponible
                </span>
            );
        case 1:
            return (
                <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm">
                    🕒 En proceso de adopción
                </span>
            );
        case 2:
            return (
                <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-800 font-semibold text-sm">
                    🏠 Adoptado
                </span>
            );
        case 3:
            return (
                <span className="inline-flex items-center px-2 py-1 rounded bg-gray-200 text-gray-700 font-semibold text-sm">
                    ⚰️ Fallecido
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 font-semibold text-sm">
                    ❓ Desconocido
                </span>
            );
    }
}

export default function AnimalList() {
    const { animals, isLoading, isError } = useAnimals();
    const { address } = useWallet();
    const contract = useContract();
    const [owner, setOwner] = useState<string | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<{ id: number, name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOwner = async () => {
            if (contract) {
                const ownerAddr = await contract.owner();
                setOwner(ownerAddr.toLowerCase());
            }
        };
        fetchOwner();
    }, [contract]);

    const handleAdoptionClick = (animalId: number, animalName: string) => {
        setSelectedAnimal({ id: animalId, name: animalName });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAnimal(null);
    };

    if (isLoading) return <div>Cargando animales...</div>;
    if (isError) return <div>Error al cargar animales</div>;
    if (!animals || animals.length === 0) return <div>No hay animales registrados.</div>;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map((animal: any) => (
                    <div key={animal.id} className="border rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
                        {/* Imagen del animal */}
                        <div className="h-48 bg-gray-200 overflow-hidden">
                            {animal.ipfsHashes && animal.ipfsHashes.length > 0 ? (
                                <img
                                    src={`https://gateway.pinata.cloud/ipfs/${animal.ipfsHashes[0]}`}
                                    alt={animal.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback si la imagen no carga
                                        e.currentTarget.src = "https://placehold.co/400x300/e5e7eb/6b7280?text=Sin+Imagen";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🐾</div>
                                        <div className="text-sm">Sin imagen</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Información del animal */}
                        <div className="p-4">
                            <div className="mb-3">
                                <h2 className="font-bold text-xl mb-2 text-gray-900">{animal.name}</h2>
                                <div className="mb-2">{getStatusBadge(Number(animal.status))}</div>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600 mb-4">
                                <p><span className="font-medium">Especie:</span> {animal.species}</p>
                                <p><span className="font-medium">Edad:</span> {animal.age} meses</p>
                                <p><span className="font-medium">Raza:</span> {animal.breed}</p>
                                <p><span className="font-medium">Descripción:</span> {animal.description}</p>
                            </div>

                            {/* Botones de acción */}
                            {owner && address && owner !== address.toLowerCase() && Number(animal.status) === 0 && (
                                <div className="space-y-2 mt-4">
                                    <DonateToAnimal animalId={Number(animal.id)} />
                                    <button
                                        onClick={() => handleAdoptionClick(Number(animal.id), animal.name)}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Solicitar Adopción
                                    </button>
                                </div>
                            )}

                            {/* Mostrar más imágenes si las hay */}
                            {animal.ipfsHashes && animal.ipfsHashes.length > 1 && (
                                <div className="mt-3 pt-3 border-t">
                                    <div className="text-xs text-gray-500 mb-2">Más imágenes:</div>
                                    <div className="flex gap-2 overflow-x-auto">
                                        {animal.ipfsHashes.slice(1, 4).map((hash: string, index: number) => (
                                            <img
                                                key={index}
                                                src={`https://gateway.pinata.cloud/ipfs/${hash}`}
                                                alt={`${animal.name} ${index + 2}`}
                                                className="w-12 h-12 object-cover rounded border flex-shrink-0"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ))}
                                        {animal.ipfsHashes.length > 4 && (
                                            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                                                +{animal.ipfsHashes.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de adopción */}
            {selectedAnimal && (
                <AdoptionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    animalId={selectedAnimal.id}
                    animalName={selectedAnimal.name}
                />
            )}
        </>
    );
}