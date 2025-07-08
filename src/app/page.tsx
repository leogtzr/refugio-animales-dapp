"use client";
import ConnectWallet from "../components/ConnectWallet";
import AnimalList from "../components/AnimalList";
import RegisterAnimalForm from "../components/RegisterAnimalForm";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Refugio Animal en la Blockchain</h1>
        <ConnectWallet />
      </div>
      <RegisterAnimalForm />
      <AnimalList />
    </main>
  );
}