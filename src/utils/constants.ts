export const CONTRACT_ADDRESS = "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

export const CONTRACT_ABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "fallback",
    "stateMutability": "payable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "addAdmin",
    "inputs": [
      {
        "name": "_admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "admins",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "adoptionRequests",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "requester",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "fullName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "phone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "requesterAddress",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "experience",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "requestDate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "approved",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "processed",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "animals",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "age",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "species",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "breed",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "description",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "rescueDate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "donationsReceived",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "status",
        "type": "uint8",
        "internalType": "enum RefugioAnimal.AnimalStatus"
      },
      {
        "name": "adoptedBy",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "adoptionDate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "exists",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approveAdoption",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_requestIndex",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donateToAnimal",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "donateToShelter",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "emergencyWithdraw",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAdoptionRequests",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct RefugioAnimal.AdoptionRequest[]",
        "components": [
          {
            "name": "animalId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "requester",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "fullName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "phone",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "requesterAddress",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "experience",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "requestDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "approved",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "processed",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllAnimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct RefugioAnimal.Animal[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "age",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "species",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "breed",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "ipfsHashes",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "rescueDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "donationsReceived",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum RefugioAnimal.AnimalStatus"
          },
          {
            "name": "adoptedBy",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "adoptionDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAnimal",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct RefugioAnimal.Animal",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "age",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "species",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "breed",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "ipfsHashes",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "rescueDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "donationsReceived",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum RefugioAnimal.AnimalStatus"
          },
          {
            "name": "adoptedBy",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "adoptionDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAvailableAnimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct RefugioAnimal.Animal[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "age",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "species",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "breed",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "ipfsHashes",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "rescueDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "donationsReceived",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum RefugioAnimal.AnimalStatus"
          },
          {
            "name": "adoptedBy",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "adoptionDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalAnimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserDonations",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "registerAnimal",
    "inputs": [
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_age",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_species",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_breed",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_description",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_ipfsHashes",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAdmin",
    "inputs": [
      {
        "name": "_admin",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "requestAdoption",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_fullName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_phone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_address",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_experience",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "shelterInfo",
    "inputs": [],
    "outputs": [
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "physicalAddress",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "phone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "website",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "socialMedia",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalAnimalsRescued",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalDonations",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateAnimalInfo",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_age",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_description",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_ipfsHashes",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateAnimalStatus",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_newStatus",
        "type": "uint8",
        "internalType": "enum RefugioAnimal.AnimalStatus"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateShelterInfo",
    "inputs": [
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_physicalAddress",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_phone",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_website",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_socialMedia",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_adminNames",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userDonations",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawAnimalDonations",
    "inputs": [
      {
        "name": "_animalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawDonations",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "AdminAdded",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AdminRemoved",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AdoptionApproved",
    "inputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "adopter",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AdoptionRequested",
    "inputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "requester",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AnimalRegistered",
    "inputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "species",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AnimalStatusUpdated",
    "inputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "newStatus",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum RefugioAnimal.AnimalStatus"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DonationReceived",
    "inputs": [
      {
        "name": "animalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "donor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ShelterInfoUpdated",
    "inputs": [],
    "anonymous": false
  }
];