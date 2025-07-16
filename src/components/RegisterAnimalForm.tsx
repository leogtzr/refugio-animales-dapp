"use client";
import { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";

export default function RegisterAnimalForm() {
    const { signer, address } = useWallet();
    const contract = useContract(signer);

    const [form, setForm] = useState({
        name: "",
        age: "",
        species: "",
        breed: "",
        description: "",
        ipfsHashes: "",
    });
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [isOwner, setIsOwner] = useState<boolean | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Check if Owner...
    useEffect(() => {
        const checkOwner = async () => {
            if (contract && address) {
                try {
                    const owner = await contract.owner();
                    setIsOwner(owner.toLowerCase() === address.toLowerCase());
                } catch {
                    setIsOwner(false);
                }
            }
        };
        checkOwner();
    }, [contract, address]);

    // Remove messages after a few secs
    useEffect(() => {
        if (successMsg || errorMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg(null);
                setErrorMsg(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successMsg, errorMsg]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);

        let ipfsArr: string[] = [];
        
        try {
            // Upload to Pinata
            if (images.length > 0) {
                setUploading(true);
                const formData = new FormData();
                images.forEach(img => formData.append('file', img));
                
                const res = await fetch('/api/uploadToPinata', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!res.ok) {
                    throw new Error('Error subiendo imágenes a Pinata');
                }
                
                const data = await res.json();
                ipfsArr = data.cids || [];
                setUploading(false);
                
                if (ipfsArr.length === 0) {
                    throw new Error('No se pudieron obtener los CIDs de las imágenes');
                }
            } else {
                // If no images, try to use the hashes in the form input
                ipfsArr = form.ipfsHashes.split(",").map(s => s.trim()).filter(Boolean);
            }

            // Register the animal in the SC
            const tx = await contract.registerAnimal(
                form.name,
                Number(form.age),
                form.species,
                form.breed,
                form.description,
                ipfsArr
            );
            await tx.wait();
            setTxHash(tx.hash);
            setSuccessMsg("¡Animal registrado exitosamente!");
            
            // Clear the form
            setForm({
                name: "",
                age: "",
                species: "",
                breed: "",
                description: "",
                ipfsHashes: "",
            });
            setImages([]);
            
            // Clean the files
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (e: any) {
            setErrorMsg("Error: " + (e?.reason || e?.message || e));
            setUploading(false);
        }
        setLoading(false);
    };

    if (isOwner === false) {
        return <></>;
    }

    if (isOwner === null) {
        return (
            <div className="border rounded p-4 mb-8 bg-gray-50 text-gray-500">
                Verificando permisos...
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border rounded p-6 mb-8 bg-gray-50 shadow">
            <h2 className="text-xl font-bold mb-4 text-green-700">Registrar nuevo animal 🐶🐱</h2>
            
            {successMsg && (
                <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-300 animate-fade-in">
                    {successMsg}
                    {txHash && (
                        <div className="text-xs mt-1">
                            <span>Tx: </span>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {txHash.slice(0, 10)}...
                            </a>
                        </div>
                    )}
                </div>
            )}

            {errorMsg && (
                <div className="mb-4 px-4 py-2 rounded bg-red-100 text-red-800 border border-red-300 animate-fade-in">
                    {errorMsg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Nombre</label>
                    <input 
                        name="name" 
                        placeholder="Nombre del animalito" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="border px-3 py-2 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Edad (meses)</label>
                    <input 
                        name="age" 
                        type="number" 
                        min="0"
                        placeholder="Edad en meses" 
                        value={form.age} 
                        onChange={handleChange} 
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Especie</label>
                    <input 
                        name="species" 
                        placeholder="Perro, Gato, etc." 
                        value={form.species} 
                        onChange={handleChange} 
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">Raza</label>
                    <input 
                        name="breed" 
                        placeholder="Labrador, Siamés, etc." 
                        value={form.breed} 
                        onChange={handleChange} 
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-black">Descripción</label>
                    <textarea 
                        name="description" 
                        placeholder="Descripción del animal, personalidad, cuidados especiales, etc." 
                        value={form.description} 
                        onChange={handleChange} 
                        rows={3}
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" 
                        required 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-black">Imágenes del animal</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {images.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            <strong>Archivos seleccionados:</strong> {images.map(img => img.name).join(", ")}
                        </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                        Puedes seleccionar múltiples imágenes. Formatos soportados: JPG, PNG, GIF
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-black">
                        O ingresa CIDs manualmente (separados por coma)
                    </label>
                    <input 
                        name="ipfsHashes" 
                        placeholder="bafkrei..., Qm..., bafyb..." 
                        value={form.ipfsHashes} 
                        onChange={handleChange} 
                        className="border px-3 py-2 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500" 
                        disabled={images.length > 0}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {images.length > 0 ? "Campo deshabilitado porque has seleccionado imágenes arriba" : "Solo si no subes imágenes arriba"}
                    </div>
                </div>
            </div>
            
            <button
                type="submit"
                disabled={loading || uploading}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
            >
                {uploading ? "Subiendo imágenes... 📤" : loading ? "Registrando en blockchain... 🐾" : "Registrar Animal 🐾"}
            </button>
            
            {uploading && (
                <div className="mt-2 text-sm text-blue-600">
                    Subiendo {images.length} imagen{images.length > 1 ? 'es' : ''} a IPFS...
                </div>
            )}
        </form>
    );
}