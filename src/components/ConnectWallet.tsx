"use client";
import { useWallet } from "../hooks/useWallet";

export default function ConnectWallet() {
  const { address } = useWallet();

  if (address) {
    return (
      <div className="text-green-700 font-semibold">
        Conectado: {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    );
  }

  const connect = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      window.location.reload();
    }
  };

  return (
    <button
      onClick={connect}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Conectar Wallet
    </button>
  );
}