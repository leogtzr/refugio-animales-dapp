"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { useContract } from "../../../hooks/useContract";
import { formatEther } from "ethers";
import DonateToAnimal from "../../../components/DonateToAnimal";
import AdoptionModal from "../../../components/AdoptionModal";

function getStatusBadge(status: number) {
    switch (status) {
        case 0: return <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">🟢 Disponible</span>;
        case 1: return <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm">🕒 En proceso de adopción</span>;
        case 2: return <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-800 font-semibold text-sm">🏠 Adoptado</span>;
        case 3: return <span className="inline-flex items-center px-2 py-1 rounded bg-gray-200 text-gray-700 font-semibold text-sm">⚰️ Fallecido</span>;
        default: return <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 font-semibold text-sm">❓ Desconocido</span>;
    }
}

export default function AnimalDetailPage() {
    const params = useParams();
    const router = useRouter();
    const animalId = Number(params.id);
    const { address } = useWallet();
    const contract = useContract();
    const [animal, setAnimal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
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
        const fetchData = async () => {
            if (!contract || !animalId) return;
            setLoading(true);
            try {
                const data = await contract.getAnimal(animalId);
                setAnimal(data);
                const ownerAddr = await contract.owner();
                setOwner(ownerAddr.toLowerCase());
            } catch (e) {
                setAnimal(null);
            }
            setLoading(false);
        };
        fetchData();
    }, [contract, animalId]);

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

    useEffect(() => {
        if (!imageModal) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeImageModal();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [imageModal]);

    if (loading) return <div className="max-w-2xl mx-auto p-6">Cargando...</div>;
    if (!animal) return <div className="max-w-2xl mx-auto p-6">No se encontró el animal.</div>;

    const images = (animal.ipfsHashes || []).map(
        (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash}`
    );

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/animal/${animalId}` : '';

    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <button 
                    onClick={() => router.back()} 
                    className="mb-4 text-blue-600 underline hover:text-blue-800"
                >
                    ← Volver
                </button>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Galería de imágenes */}
                    <div className="relative h-96 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {images.length > 0 ? (
                            <img
                                src={images[0]}
                                alt={animal.name}
                                className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                                onClick={() => openImageModal(images, 0, animal.name)}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/600x400/e5e7eb/6b7280?text=Sin+Imagen";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🐾</div>
                                    <div className="text-lg">Sin imagen</div>
                                </div>
                            </div>
                        )}
                        {/* Miniaturas si hay más imágenes */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-3 py-2 rounded-lg shadow">
                                {images.map((src: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`${animal.name} ${idx + 1}`}
                                        className={`w-12 h-12 object-cover rounded border-2 cursor-pointer hover:ring-2 hover:ring-green-500 transition ${idx === 0 ? "ring-2 ring-green-600" : ""
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
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{animal.name}</h1>
                                <div className="mb-2">
                                    {getStatusBadge(Number(animal.status))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium text-gray-700">Especie:</span>
                                    <span className="ml-2 font-semibold text-gray-900">{animal.species}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Edad:</span>
                                    <span className="ml-2 font-semibold text-gray-900">{animal.age} meses</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Raza:</span>
                                    <span className="ml-2 font-semibold text-gray-900">{animal.breed}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Fecha de rescate:</span>
                                    <span className="ml-2 font-semibold text-gray-900">
                                        {new Date(Number(animal.rescueDate) * 1000).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium text-gray-700">Donaciones recibidas:</span>
                                    <span className="ml-2 font-semibold text-green-600">
                                        {formatEther(animal.donationsReceived || 0)} ETH
                                    </span>
                                </div>
                                {Number(animal.status) === 2 && animal.adoptedBy && (
                                    <div>
                                        <span className="font-medium text-gray-700">Adoptado por:</span>
                                        <span className="ml-2 font-semibold text-blue-600">
                                            {animal.adoptedBy.slice(0, 6)}...{animal.adoptedBy.slice(-4)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Descripción:</h3>
                            <p className="text-gray-900 leading-relaxed">{animal.description}</p>
                        </div>
                        {/* Botones de compartir */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3">Compartir a {animal.name}:</h3>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`https://wa.me/?text=¡Mira a ${animal.name} en el Refugio Blockchain! ${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                >
                                    📱 WhatsApp
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=¡Adopta a ${animal.name} en el Refugio Blockchain! ${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                >
                                    🐦 Twitter
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
                                >
                                    📘 Facebook
                                </a>
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: `Adopta a ${animal.name}`,
                                                text: `¡Mira a ${animal.name} en el Refugio Blockchain!`,
                                                url: shareUrl,
                                            });
                                        } else {
                                            navigator.clipboard.writeText(shareUrl);
                                            alert('Enlace copiado al portapapeles');
                                        }
                                    }}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                                >
                                    🔗 Copiar enlace
                                </button>
                            </div>
                        </div>
                        {/* Botones de acción */}
                        {owner &&
                            address &&
                            owner !== address.toLowerCase() &&
                            Number(animal.status) === 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DonateToAnimal animalId={Number(animal.id)} />
                                    <button
                                        onClick={() =>
                                            handleAdoptionClick(Number(animal.id), animal.name)
                                        }
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Solicitar Adopción
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
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
                        className="relative bg-white rounded-lg shadow-lg p-2 max-w-4xl w-full flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold z-20"
                            onClick={closeImageModal}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        {/* Flecha izquierda */}
                        {imageModal.images.length > 1 && (
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-2xl text-gray-700 hover:bg-green-100 hover:text-green-700 transition z-10"
                                onClick={prevImage}
                                aria-label="Anterior"
                            >
                                &#8592;
                            </button>
                        )}
                        <img
                            src={imageModal.images[imageModal.current]}
                            alt={imageModal.alt}
                            className="max-h-[80vh] w-auto rounded"
                        />
                        {/* Flecha derecha */}
                        {imageModal.images.length > 1 && (
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-2xl text-gray-700 hover:bg-green-100 hover:text-green-700 transition z-10"
                                onClick={nextImage}
                                aria-label="Siguiente"
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