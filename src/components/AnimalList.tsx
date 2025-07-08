"use client";
import { useAnimals } from "../hooks/useAnimals";
//import { getStatusText } from "../utils/utils";
function getStatusText(status: number) {
    switch (status) {
        case 0: return "Disponible";
        case 1: return "En proceso de adopción";
        case 2: return "Adoptado";
        case 3: return "Fallecido";
        default: return "Desconocido";
    }
}

export default function AnimalList() {
    const { animals, isLoading, isError } = useAnimals();

    if (isLoading) return <div>Cargando animales...</div>;
    if (isError) return <div>Error al cargar animales</div>;

    if (!animals || animals.length === 0) return <div>No hay animales registrados.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {animals.map((animal: any) => (
                <div key={animal.id} className="border rounded p-4 shadow">
                    <h2 className="font-bold text-lg">{animal.name}</h2>
                    <p>Especie: {animal.species}</p>
                    <p>Edad: {animal.age} meses</p>
                    <p>Raza: {animal.breed}</p>
                    <p>Descripción: {animal.description}</p>
                    <p>Status: {getStatusText(Number(animal.status))}</p>
                    {/* Buttons to donate or adopt... */}
                </div>
            ))}
        </div>
    );
}