import { useMemo } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

export function useContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
    return useMemo(() => getContract(signerOrProvider), [signerOrProvider]);
}