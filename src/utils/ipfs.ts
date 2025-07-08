// Ejemplo usando web3.storage (puedes usar otro proveedor si prefieres)
import { Web3Storage, File } from "web3.storage";

const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN!;

export function getWeb3StorageClient() {
    return new Web3Storage({ token: WEB3STORAGE_TOKEN });
}

export async function uploadToIPFS(files: File[]) {
    const client = getWeb3StorageClient();
    const cid = await client.put(files);
    return cid;
}

export function getIPFSUrl(cid: string, filename: string) {
    return `https://${cid}.ipfs.dweb.link/${filename}`;
}