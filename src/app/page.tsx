"use client";
import ConnectWallet from "../components/ConnectWallet";
import AnimalList from "../components/AnimalList";
import RegisterAnimalForm from "../components/RegisterAnimalForm";
import { useWallet } from "../hooks/useWallet";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
    const { address } = useWallet();
    const contract = useContract();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const checkOwner = async () => {
            if (contract && address) {
                const owner = await contract.owner();
                setIsOwner(owner.toLowerCase() === address.toLowerCase());
            }
        };
        checkOwner();
    }, [contract, address]);

    return (
        <main className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Refugio Animal en la Blockchain</h1>
                <ConnectWallet />
            </div>
            {isOwner && (
                <div className="mb-6">
                    <Link
                        href="/admin"
                        className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                    >
                        Ir a Consola de Administración
                    </Link>
                </div>
            )}
            <RegisterAnimalForm />
            <AnimalList />
        </main>
    );
}