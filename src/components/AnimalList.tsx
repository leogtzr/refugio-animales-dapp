"use client";
import { useAnimals } from "../hooks/useAnimals";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import DonateToAnimal from "./DonateToAnimal";
import AdoptionModal from "./AdoptionModal";
import Link from "next/link";

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

    // Visor de imágenes
    const [imageModal, setImageModal] = useState<{
        images: string[];
        current: number;
        alt: string;
    } | null>(null);

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

    // Abrir visor de imágenes
    const openImageModal = (images: string[], idx: number, alt: string) => {
        setImageModal({ images, current: idx, alt });
    };

    // Navegación en el visor
    const nextImage = () => {
        if (!imageModal) return;
        setImageModal({
            ...imageModal,
            current: (imageModal.current + 1) % imageModal.images.length,
        });
    };
    const prevImage = () => {
        if (!imageModal) return;
        setImageModal({
            ...imageModal,
            current:
                (imageModal.current - 1 + imageModal.images.length) %
                imageModal.images.length,
        });
    };
    const closeImageModal = () => setImageModal(null);

    // Navegación con teclado
    useEffect(() => {
        if (!imageModal) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeImageModal();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [imageModal]);

    if (isLoading) return <div>Cargando animales...</div>;
    if (isError) return <div>Error al cargar animales</div>;
    if (!animals || animals.length === 0) return <div>No hay animales registrados.</div>;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map((animal: any) => {
                    const images = (animal.ipfsHashes || []).map(
                        (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash}`
                    );
                    return (
                        <div
                            key={animal.id}
                            className="border rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            {/* Galería de imágenes */}
                            <div className="relative h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {images.length > 0 ? (
                                    <img
                                        src={images[0]}
                                        alt={animal.name}
                                        className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                                        onClick={() => openImageModal(images, 0, animal.name)}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://placehold.co/400x300/e5e7eb/6b7280?text=Sin+Imagen";
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
                                {/* Miniaturas si hay más imágenes */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 px-2 py-1 rounded shadow">
                                        {images.map((src: string, idx: number) => (
                                            <img
                                                key={idx}
                                                src={src}
                                                alt={`${animal.name} ${idx + 1}`}
                                                className={`w-10 h-10 object-cover rounded border cursor-pointer hover:ring-2 hover:ring-green-500 transition ${idx === 0 ? "ring-2 ring-green-600" : ""
                                                    }`}
                                                onClick={() => openImageModal(images, idx, `${animal.name} ${idx + 1}`)}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Información del animal */}
                            <div className="p-4">
                                <div className="mb-3">
                                    <h2 className="font-bold text-xl mb-2 text-gray-900">
                                        <Link href={`/animal?id=${animal.id}`}>{animal.name}</Link>
                                    </h2>
                                    <div className="mb-2">
                                        {getStatusBadge(Number(animal.status))}
                                    </div>
                                </div>

                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                    <p>
                                        <span className="font-medium">Especie:</span> <span className="font-semibold">{animal.species}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Edad:</span> <span className="font-semibold">{animal.age} meses</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Raza:</span> <span className="font-semibold">{animal.breed}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Descripción:</span> <span className="font-semibold">{animal.description}</span>
                                    </p>
                                </div>

                                {/* Botones de acción */}
                                {owner &&
                                    address &&
                                    owner !== address.toLowerCase() &&
                                    Number(animal.status) === 0 && (
                                        <div className="space-y-2 mt-4">
                                            <DonateToAnimal animalId={Number(animal.id)} />
                                            <button
                                                onClick={() =>
                                                    handleAdoptionClick(Number(animal.id), animal.name)
                                                }
                                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Solicitar Adopción
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </div>
                    );
                })}
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

            {/* Modal visor de imagen con flechas */}
            {imageModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={closeImageModal}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-lg p-2 max-w-3xl w-full flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
                            onClick={closeImageModal}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        {/* Flecha izquierda */}
                        {imageModal.images.length > 1 && (
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-2xl text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                                onClick={prevImage}
                                aria-label="Anterior"
                                style={{ zIndex: 10 }}
                            >
                                &#8592;
                            </button>
                        )}
                        <img
                            src={imageModal.images[imageModal.current]}
                            alt={imageModal.alt}
                            className="max-h-[70vh] w-auto rounded"
                        />
                        {/* Flecha derecha */}
                        {imageModal.images.length > 1 && (
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-2xl text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
                                onClick={nextImage}
                                aria-label="Siguiente"
                                style={{ zIndex: 10 }}
                            >
                                &#8594;
                            </button>
                        )}
                        <div className="mt-2 text-gray-700 text-sm">
                            {imageModal.alt} ({imageModal.current + 1} / {imageModal.images.length})
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}