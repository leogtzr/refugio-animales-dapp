import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

export function getContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
    if (!signerOrProvider && typeof window !== "undefined" && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    }
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider!);
}