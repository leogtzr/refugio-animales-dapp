import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
    const [accounts, setAccounts] = useState<string[] | null>(null); // null = no listo, [] = sin cuentas
    const [provider, setProvider] = useState<ethers.BrowserProvider>();
    const [signer, setSigner] = useState<ethers.JsonRpcSigner>();

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).ethereum) {
            const eth = (window as any).ethereum;
            const provider = new ethers.BrowserProvider(eth);
            setProvider(provider);

            const getAccounts = async () => {
                try {
                    const accs: string[] = await eth.request({ method: "eth_accounts" });
                    setAccounts(accs);
                    if (accs.length > 0) {
                        const signer = await provider.getSigner();
                        setSigner(signer);
                    } else {
                        setSigner(undefined);
                    }
                } catch (error) {
                    setAccounts([]);
                    setSigner(undefined);
                }
            };

            const handleAccountsChanged = (accs: string[]) => {
                setAccounts(accs);
                if (accs.length > 0) {
                    provider.getSigner().then(setSigner);
                } else {
                    setSigner(undefined);
                }
            };

            const handleChainChanged = () => {
                window.location.reload();
            };

            eth.on("accountsChanged", handleAccountsChanged);
            eth.on("chainChanged", handleChainChanged);

            getAccounts();

            return () => {
                eth.removeListener("accountsChanged", handleAccountsChanged);
                eth.removeListener("chainChanged", handleChainChanged);
            };
        }
    }, []);

    const address = accounts && accounts.length > 0 ? accounts[0] : undefined;
    const isReady = accounts !== null;

    return { address, provider, signer, isReady };
}