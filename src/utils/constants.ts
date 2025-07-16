export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "admins",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "adoptionRequests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "requester",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "fullName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "requesterAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "experience",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "requestDate",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "processed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "animals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "species",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "breed",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "rescueDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "donationsReceived",
                "type": "uint256"
            },
            {
                "internalType": "enum RefugioAnimal.AnimalStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "adoptedBy",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "adoptionDate",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_requestIndex",
                "type": "uint256"
            }
        ],
        "name": "approveAdoption",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            }
        ],
        "name": "donateToAnimal",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "donateToShelter",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "emergencyWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            }
        ],
        "name": "getAdoptionRequests",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "animalId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "requester",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "fullName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "phone",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "requesterAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "experience",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "requestDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "processed",
                        "type": "bool"
                    }
                ],
                "internalType": "struct RefugioAnimal.AdoptionRequest[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllAnimals",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "species",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "breed",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "ipfsHashes",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rescueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donationsReceived",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum RefugioAnimal.AnimalStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "adoptedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "adoptionDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    }
                ],
                "internalType": "struct RefugioAnimal.Animal[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            }
        ],
        "name": "getAnimal",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "species",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "breed",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "ipfsHashes",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rescueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donationsReceived",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum RefugioAnimal.AnimalStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "adoptedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "adoptionDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    }
                ],
                "internalType": "struct RefugioAnimal.Animal",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAvailableAnimals",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "age",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "species",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "breed",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "ipfsHashes",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rescueDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donationsReceived",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum RefugioAnimal.AnimalStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "adoptedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "adoptionDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    }
                ],
                "internalType": "struct RefugioAnimal.Animal[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalAnimals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserDonations",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_species",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_breed",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_ipfsHashes",
                "type": "string[]"
            }
        ],
        "name": "registerAnimal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            }
        ],
        "name": "removeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_fullName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_address",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_experience",
                "type": "string"
            }
        ],
        "name": "requestAdoption",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "shelterInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "physicalAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "socialMedia",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalAnimalsRescued",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDonations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_ipfsHashes",
                "type": "string[]"
            }
        ],
        "name": "updateAnimalInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            },
            {
                "internalType": "enum RefugioAnimal.AnimalStatus",
                "name": "_newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateAnimalStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_physicalAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_phone",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_website",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_socialMedia",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_adminNames",
                "type": "string[]"
            }
        ],
        "name": "updateShelterInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userDonations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_animalId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawAnimalDonations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawDonations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "AdminAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            }
        ],
        "name": "AdminRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "adopter",
                "type": "address"
            }
        ],
        "name": "AdoptionApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "requester",
                "type": "address"
            }
        ],
        "name": "AdoptionRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "species",
                "type": "string"
            }
        ],
        "name": "AnimalRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum RefugioAnimal.AnimalStatus",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "AnimalStatusUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "animalId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "DonationReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "ShelterInfoUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    }
];