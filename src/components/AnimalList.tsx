"use client";
import { useAnimals } from "../hooks/useAnimals";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import DonateToAnimal from "./DonateToAnimal";
import RequestAdoption from "./RequestAdoption";

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

  useEffect(() => {
    const fetchOwner = async () => {
      if (contract) {
        const ownerAddr = await contract.owner();
        setOwner(ownerAddr.toLowerCase());
      }
    };
    fetchOwner();
  }, [contract]);

  if (isLoading) return <div>Cargando animales...</div>;
  if (isError) return <div>Error al cargar animales</div>;
  if (!animals || animals.length === 0) return <div>No hay animales registrados.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {animals.map((animal: any) => (
        <div key={animal.id} className="border rounded p-4 shadow bg-white flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg mb-1 text-black">{animal.name}</h2>
            <p className="mb-1 text-black">Especie: <span className="font-semibold text-black">{animal.species}</span></p>
            <p className="mb-1 text-black">Edad: <span className="font-semibold text-black">{animal.age} meses</span></p>
            <p className="mb-1 text-black">Raza: <span className="font-semibold text-black">{animal.breed}</span></p>
            <p className="mb-1 text-black">Descripción: <span className="font-normal text-black">{animal.description}</span></p>
            <p className="mb-2 text-black">Status: {getStatusBadge(Number(animal.status))}</p>
          </div>
          {/* Mostrar botones solo si NO eres el owner */}
          {owner && address && owner !== address.toLowerCase() && Number(animal.status) === 0 && (
            <div className="mt-2 flex flex-col gap-2">
              <DonateToAnimal animalId={Number(animal.id)} />
              <RequestAdoption animalId={Number(animal.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}