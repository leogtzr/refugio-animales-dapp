import useSWR from "swr";
import { useContract } from "./useContract";
import { useWallet } from "./useWallet";

export function useAnimals() {
  const { provider } = useWallet();
  const contract = useContract(provider);

  const fetcher = async () => {
    const total = await contract.getTotalAnimals();
    const animals = [];
    for (let i = 1; i <= Number(total); i++) {
      const animal = await contract.getAnimal(i);
      animals.push(animal);
    }
    return animals;
  };

  const { data, error, mutate } = useSWR("animals", fetcher);
  if (error) {
    console.error("Error al cargar animales:", error);
  }

  return {
    animals: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}