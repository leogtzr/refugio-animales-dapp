// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RefugioAnimal is Ownable, ReentrancyGuard {
    uint256 private _animalIds;

    enum AnimalStatus {
        Available,
        InAdoptionProcess,
        Adopted,
        Deceased
    }

    struct Animal {
        uint256 id;
        string name;
        uint256 age; // en meses
        string species; // perro, gato, etc.
        string breed;
        string description;
        string[] ipfsHashes; // máximo 3 elementos
        uint256 rescueDate;
        uint256 donationsReceived;
        AnimalStatus status;
        address adoptedBy;
        uint256 adoptionDate;
        bool exists;
    }

    struct ShelterInfo {
        string name;
        string physicalAddress;
        string email;
        string phone;
        string website;
        string socialMedia;
        string[] adminNames;
    }

    struct AdoptionRequest {
        uint256 animalId;
        address requester;
        string fullName;
        string email;
        string phone;
        string requesterAddress;
        string experience;
        uint256 requestDate;
        bool approved;
        bool processed;
    }

    // State variables
    mapping(uint256 => Animal) public animals;
    mapping(address => bool) public admins;
    mapping(uint256 => AdoptionRequest[]) public adoptionRequests;
    mapping(address => uint256[]) public userDonations; // animalId => amount

    ShelterInfo public shelterInfo;
    uint256 public totalDonations;
    uint256 public totalAnimalsRescued;

    // Events
    event AnimalRegistered(uint256 indexed animalId, string name, string species);
    event DonationReceived(uint256 indexed animalId, address indexed donor, uint256 amount);
    event AdoptionRequested(uint256 indexed animalId, address indexed requester);
    event AdoptionApproved(uint256 indexed animalId, address indexed adopter);
    event AnimalStatusUpdated(uint256 indexed animalId, AnimalStatus newStatus);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event ShelterInfoUpdated();

    modifier onlyAdminOrOwner() {
        require(admins[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    modifier animalExists(uint256 _animalId) {
        require(animals[_animalId].exists, "Animal does not exist");
        _;
    }

    constructor() Ownable(msg.sender) {
        admins[msg.sender] = true;
        totalAnimalsRescued = 0;
        totalDonations = 0;

        // Can be changed later with ref:updateShelterInfo()
        shelterInfo = ShelterInfo({
            name: "Refugio Animal Patitas ",
            physicalAddress: "",
            email: "leogutierrezramirez@gmail.com",
            phone: "",
            website: "",
            socialMedia: "",
            adminNames: new string[](0)
        });
    }

    // Admin functions
    function addAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Invalid address");
        require(!admins[_admin], "Already an admin");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlyOwner {
        require(admins[_admin], "Not an admin");
        require(_admin != owner(), "Cannot remove owner");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function registerAnimal(
        string memory _name,
        uint256 _age,
        string memory _species,
        string memory _breed,
        string memory _description,
        string[] memory _ipfsHashes
    ) external onlyAdminOrOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_ipfsHashes.length <= 3, "Maximum 3 IPFS hashes allowed");

        _animalIds++;
        uint256 newAnimalId = _animalIds;

        animals[newAnimalId] = Animal({
            id: newAnimalId,
            name: _name,
            age: _age,
            species: _species,
            breed: _breed,
            description: _description,
            ipfsHashes: _ipfsHashes,
            rescueDate: block.timestamp,
            donationsReceived: 0,
            status: AnimalStatus.Available,
            adoptedBy: address(0),
            adoptionDate: 0,
            exists: true
        });

        totalAnimalsRescued++;
        emit AnimalRegistered(newAnimalId, _name, _species);
    }

    function updateAnimalStatus(uint256 _animalId, AnimalStatus _newStatus)
        external
        onlyAdminOrOwner
        animalExists(_animalId)
    {
        animals[_animalId].status = _newStatus;
        emit AnimalStatusUpdated(_animalId, _newStatus);
    }

    function updateAnimalInfo(
        uint256 _animalId,
        string memory _name,
        uint256 _age,
        string memory _description,
        string[] memory _ipfsHashes
    ) external onlyAdminOrOwner animalExists(_animalId) {
        require(_ipfsHashes.length <= 3, "Maximum 3 IPFS hashes allowed");

        Animal storage animal = animals[_animalId];
        animal.name = _name;
        animal.age = _age;
        animal.description = _description;
        animal.ipfsHashes = _ipfsHashes;
    }

    function updateShelterInfo(
        string memory _name,
        string memory _physicalAddress,
        string memory _email,
        string memory _phone,
        string memory _website,
        string memory _socialMedia,
        string[] memory _adminNames
    ) external onlyAdminOrOwner {
        shelterInfo.name = _name;
        shelterInfo.physicalAddress = _physicalAddress;
        shelterInfo.email = _email;
        shelterInfo.phone = _phone;
        shelterInfo.website = _website;
        shelterInfo.socialMedia = _socialMedia;
        shelterInfo.adminNames = _adminNames;

        emit ShelterInfoUpdated();
    }

    // Public functions
    function donateToAnimal(uint256 _animalId) external payable nonReentrant animalExists(_animalId) {
        require(msg.value > 0, "Donation must be greater than 0");

        animals[_animalId].donationsReceived += msg.value;
        totalDonations += msg.value;
        userDonations[msg.sender].push(_animalId);

        emit DonationReceived(_animalId, msg.sender, msg.value);
    }

    function donateToShelter() external payable nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");
        totalDonations += msg.value;
    }

    function requestAdoption(
        uint256 _animalId,
        string memory _fullName,
        string memory _email,
        string memory _phone,
        string memory _address,
        string memory _experience
    ) external animalExists(_animalId) {
        require(animals[_animalId].status == AnimalStatus.Available, "Animal not available for adoption");
        require(bytes(_fullName).length > 0, "Full name required");
        require(bytes(_email).length > 0, "Email required");

        adoptionRequests[_animalId].push(
            AdoptionRequest({
                animalId: _animalId,
                requester: msg.sender,
                fullName: _fullName,
                email: _email,
                phone: _phone,
                requesterAddress: _address,
                experience: _experience,
                requestDate: block.timestamp,
                approved: false,
                processed: false
            })
        );

        // Cambiar estado a en proceso
        animals[_animalId].status = AnimalStatus.InAdoptionProcess;

        emit AdoptionRequested(_animalId, msg.sender);
    }

    function approveAdoption(uint256 _animalId, uint256 _requestIndex)
        external
        onlyAdminOrOwner
        animalExists(_animalId)
    {
        require(_requestIndex < adoptionRequests[_animalId].length, "Invalid request index");

        AdoptionRequest storage request = adoptionRequests[_animalId][_requestIndex];
        require(!request.processed, "Request already processed");

        request.approved = true;
        request.processed = true;

        animals[_animalId].status = AnimalStatus.Adopted;
        animals[_animalId].adoptedBy = request.requester;
        animals[_animalId].adoptionDate = block.timestamp;

        emit AdoptionApproved(_animalId, request.requester);
    }

    // View functions
    function getAnimal(uint256 _animalId) external view animalExists(_animalId) returns (Animal memory) {
        return animals[_animalId];
    }

    function getAllAnimals() external view returns (Animal[] memory) {
        Animal[] memory allAnimals = new Animal[](_animalIds);

        for (uint256 i = 1; i <= _animalIds; i++) {
            if (animals[i].exists) {
                allAnimals[i - 1] = animals[i];
            }
        }

        return allAnimals;
    }

    function getAvailableAnimals() external view returns (Animal[] memory) {
        uint256 availableCount = 0;

        // Contar animales disponibles
        for (uint256 i = 1; i <= _animalIds; i++) {
            if (animals[i].exists && animals[i].status == AnimalStatus.Available) {
                availableCount++;
            }
        }

        Animal[] memory availableAnimals = new Animal[](availableCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= _animalIds; i++) {
            if (animals[i].exists && animals[i].status == AnimalStatus.Available) {
                availableAnimals[currentIndex] = animals[i];
                currentIndex++;
            }
        }

        return availableAnimals;
    }

    function getAdoptionRequests(uint256 _animalId)
        external
        view
        onlyAdminOrOwner
        animalExists(_animalId)
        returns (AdoptionRequest[] memory)
    {
        return adoptionRequests[_animalId];
    }

    function getTotalAnimals() external view returns (uint256) {
        return _animalIds;
    }

    function getUserDonations(address _user) external view returns (uint256[] memory) {
        return userDonations[_user];
    }

    // Withdraw functions
    function withdrawDonations() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success,) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function withdrawAnimalDonations(uint256 _animalId, uint256 _amount)
        external
        onlyOwner
        nonReentrant
        animalExists(_animalId)
    {
        require(_amount <= animals[_animalId].donationsReceived, "Insufficient animal donations");
        require(_amount <= address(this).balance, "Insufficient contract balance");

        animals[_animalId].donationsReceived -= _amount;

        (bool success,) = payable(owner()).call{value: _amount}("");
        require(success, "Withdrawal failed");
    }

    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        (bool success,) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Emergency withdrawal failed");
    }

    receive() external payable {
        totalDonations += msg.value;
    }

    fallback() external payable {
        totalDonations += msg.value;
    }
}
