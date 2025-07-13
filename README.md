# Refugio Animal DApp

[🇪🇸 Read this in Spanish](./README.es.md)

A decentralized application (DApp) for animal shelters, built with **Solidity** (Smart Contract) and **Next.js** (Frontend). This project allows animal shelters to register rescued animals, receive donations, and manage adoption requests transparently on the blockchain.

---

## Features

- **Register rescued animals** with images (stored on IPFS).
- **Donate** to the shelter or to specific animals (ETH).
- **Request adoption** for available animals.
- **Admin panel** for managing adoption requests and animal status.
- **User dashboard** to view your donations.
- **All data and actions are stored on-chain** for transparency.

---

## Tech Stack

- **Smart Contract:** Solidity (Foundry, OpenZeppelin)
- **Frontend:** Next.js, React, TailwindCSS
- **Blockchain:** Local Anvil node (or Sepolia testnet)
- **IPFS:** Pinata (via API) for animal images

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/youruser/refugio-animal.git
cd refugio-animal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Deploy the Smart Contract (Local)
Start a local Anvil node:
```bash
anvil
```

Deploy the contract using _Foundry_:
```bash
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key <YOUR_PRIVATE_KEY>
```
The default contract address is set in src/utils/constants.ts as CONTRACT_ADDRESS. Update it if needed.

### 4. Configure Environment Variables
Create a .env.local file in the root with your Pinata and Web3.Storage credentials:
```bash
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
NEXT_PUBLIC_WEB3STORAGE_TOKEN=your_web3storage_token
```

### 5. Run the DApp
```bash
npm run dev
```
Open http://localhost:3000 in your browser.