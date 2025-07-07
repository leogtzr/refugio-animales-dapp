import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(provider);
      provider.send("eth_requestAccounts", []).then(() => {
        provider.getSigner().then(setSigner);
        provider.getSigner().then(s => s.getAddress()).then(setAddress);
      });
    }
  }, []);

  return { address, provider, signer };
}