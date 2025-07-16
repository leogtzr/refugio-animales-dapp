// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/RefugioAnimal.sol";

error OwnableUnauthorizedAccount(address account);

contract RefugioAnimalTest is Test {
    RefugioAnimal public shelter;
    address public owner;
    address public admin;
    address public user1;
    address public user2;

    event AnimalRegistered(uint256 indexed animalId, string name, string species);
    event DonationReceived(uint256 indexed animalId, address indexed donor, uint256 amount);
    event AdoptionRequested(uint256 indexed animalId, address indexed requester);
    event AdoptionApproved(uint256 indexed animalId, address indexed adopter);

    function setUp() public {
        owner = makeAddr("owner");
        admin = makeAddr("admin");
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");

        // Deploy contract as owner
        vm.startPrank(owner);
        shelter = new RefugioAnimal();
        vm.stopPrank();

        // Fund users for testing
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
        vm.deal(admin, 1 ether);
        vm.deal(owner, 1 ether);
    }

    function testInitialState() public view {
        assertEq(shelter.owner(), owner);
        assertTrue(shelter.admins(owner));
        assertEq(shelter.totalAnimalsRescued(), 0);
        assertEq(shelter.totalDonations(), 0);
        assertEq(shelter.getTotalAnimals(), 0);
    }

    function testAddAdmin() public {
        vm.prank(owner);
        shelter.addAdmin(admin);
        assertTrue(shelter.admins(admin));

        vm.prank(admin);
        vm.expectRevert(abi.encodeWithSelector(OwnableUnauthorizedAccount.selector, admin));
        shelter.addAdmin(user1);
    }

    function testRemoveAdmin() public {
        vm.prank(owner);
        shelter.addAdmin(admin);
        assertTrue(shelter.admins(admin));

        vm.prank(owner);
        shelter.removeAdmin(admin);
        assertFalse(shelter.admins(admin));

        vm.prank(owner);
        vm.expectRevert("Cannot remove owner");
        shelter.removeAdmin(owner);
    }

    function testRegisterAnimal() public {
        string[] memory ipfsHashes = new string[](2);
        ipfsHashes[0] = "QmHash1";
        ipfsHashes[1] = "QmHash2";

        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit AnimalRegistered(1, "Firulais", "Perro");

        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Perro rescatado de la calle", ipfsHashes);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(animal.id, 1);
        assertEq(animal.name, "Firulais");
        assertEq(animal.age, 24);
        assertEq(animal.species, "Perro");
        assertEq(animal.breed, "Mestizo");
        assertEq(animal.description, "Perro rescatado de la calle");
        assertEq(uint256(animal.status), uint256(RefugioAnimal.AnimalStatus.Available));
        assertTrue(animal.exists);
        assertEq(shelter.totalAnimalsRescued(), 1);
    }

    function testRegisterAnimalOnlyAdminOrOwner() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";

        vm.prank(user1);
        vm.expectRevert("Not authorized");
        shelter.registerAnimal("Test", 12, "Gato", "Siames", "Test", ipfsHashes);

        vm.prank(owner);
        shelter.addAdmin(admin);
        vm.prank(admin);
        shelter.registerAnimal("Michi", 12, "Gato", "Siames", "Gato rescatado", ipfsHashes);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(animal.name, "Michi");
    }

    function testRegisterAnimalIPFSLimit() public {
        string[] memory ipfsHashes = new string[](4);
        ipfsHashes[0] = "QmHash1";
        ipfsHashes[1] = "QmHash2";
        ipfsHashes[2] = "QmHash3";
        ipfsHashes[3] = "QmHash4";

        vm.prank(owner);
        vm.expectRevert("Maximum 3 IPFS hashes allowed");
        shelter.registerAnimal("Test", 12, "Perro", "Mestizo", "Test", ipfsHashes);
    }

    function testDonateToAnimal() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        uint256 donationAmount = 1 ether;

        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit DonationReceived(1, user1, donationAmount);

        shelter.donateToAnimal{value: donationAmount}(1);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(animal.donationsReceived, donationAmount);
        assertEq(shelter.totalDonations(), donationAmount);
        assertEq(address(shelter).balance, donationAmount);
    }

    function testDonateToShelter() public {
        uint256 donationAmount = 2 ether;

        vm.prank(user1);
        shelter.donateToShelter{value: donationAmount}();

        assertEq(shelter.totalDonations(), donationAmount);
        assertEq(address(shelter).balance, donationAmount);
    }

    function testRequestAdoption() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        vm.prank(user1);
        vm.expectEmit(true, true, false, false);
        emit AdoptionRequested(1, user1);

        shelter.requestAdoption(
            1, "Juan Perez", "juan@email.com", "555-1234", "Calle 123", "Tengo experiencia con perros"
        );

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(uint256(animal.status), uint256(RefugioAnimal.AnimalStatus.InAdoptionProcess));
    }

    function testApproveAdoption() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        vm.prank(user1);
        shelter.requestAdoption(1, "Juan Perez", "juan@email.com", "555-1234", "Calle 123", "Experiencia");

        vm.prank(owner);
        vm.expectEmit(true, true, false, false);
        emit AdoptionApproved(1, user1);

        shelter.approveAdoption(1, 0);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(uint256(animal.status), uint256(RefugioAnimal.AnimalStatus.Adopted));
        assertEq(animal.adoptedBy, user1);
        assertTrue(animal.adoptionDate > 0);
    }

    function testUpdateAnimalStatus() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        vm.prank(owner);
        shelter.updateAnimalStatus(1, RefugioAnimal.AnimalStatus.Adopted);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(uint256(animal.status), uint256(RefugioAnimal.AnimalStatus.Adopted));
    }

    function testUpdateShelterInfo() public {
        string[] memory adminNames = new string[](2);
        adminNames[0] = "Admin 1";
        adminNames[1] = "Admin 2";

        vm.prank(owner);
        shelter.updateShelterInfo(
            "Refugio Esperanza",
            "Av. Principal 123",
            "info@refugio.com",
            "555-0000",
            "www.refugio.com",
            "@refugio_esperanza",
            adminNames
        );

        (
            string memory name,
            string memory physicalAddress,
            string memory email,
            string memory phone,
            string memory website,
            string memory socialMedia
        ) = shelter.shelterInfo();

        string[] memory adminNamesResult = adminNames;

        assertEq(name, "Refugio Esperanza");
        assertEq(physicalAddress, "Av. Principal 123");
        assertEq(email, "info@refugio.com");
        assertEq(phone, "555-0000");
        assertEq(website, "www.refugio.com");
        assertEq(socialMedia, "@refugio_esperanza");
        assertEq(adminNamesResult.length, 2);
        assertEq(adminNamesResult[0], "Admin 1");
        assertEq(adminNamesResult[1], "Admin 2");
    }

    function testGetAvailableAnimals() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";

        vm.prank(owner);
        shelter.registerAnimal("Animal1", 12, "Perro", "Mestizo", "Test1", ipfsHashes);
        vm.prank(owner);
        shelter.registerAnimal("Animal2", 24, "Gato", "Siames", "Test2", ipfsHashes);
        vm.prank(owner);
        shelter.registerAnimal("Animal3", 36, "Perro", "Labrador", "Test3", ipfsHashes);

        vm.prank(owner);
        shelter.updateAnimalStatus(2, RefugioAnimal.AnimalStatus.Adopted);

        RefugioAnimal.Animal[] memory availableAnimals = shelter.getAvailableAnimals();
        assertEq(availableAnimals.length, 2);
        assertEq(availableAnimals[0].name, "Animal1");
        assertEq(availableAnimals[1].name, "Animal3");
    }

    function testWithdrawDonations() public {
        vm.prank(user1);
        shelter.donateToShelter{value: 5 ether}();

        uint256 ownerBalanceBefore = owner.balance;
        uint256 contractBalance = address(shelter).balance;

        vm.prank(owner);
        shelter.withdrawDonations();

        assertEq(address(shelter).balance, 0);
        assertEq(owner.balance, ownerBalanceBefore + contractBalance);
    }

    function testWithdrawAnimalDonations() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        vm.prank(user1);
        shelter.donateToAnimal{value: 3 ether}(1);

        uint256 ownerBalanceBefore = owner.balance;
        uint256 withdrawAmount = 1 ether;

        vm.prank(owner);
        shelter.withdrawAnimalDonations(1, withdrawAmount);

        RefugioAnimal.Animal memory animal = shelter.getAnimal(1);
        assertEq(animal.donationsReceived, 2 ether);
        assertEq(owner.balance, ownerBalanceBefore + withdrawAmount);
    }

    function test_RevertWhen_DonateZeroAmount() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";
        vm.prank(owner);
        shelter.registerAnimal("Firulais", 24, "Perro", "Mestizo", "Test", ipfsHashes);

        vm.prank(user1);
        vm.expectRevert("Donation must be greater than 0");
        shelter.donateToAnimal{value: 0}(1);
    }

    function test_RevertWhen_AdoptNonexistentAnimal() public {
        vm.prank(user1);
        vm.expectRevert("Animal does not exist");
        shelter.requestAdoption(999, "Test", "test@email.com", "123", "Address", "Experience");
    }

    function test_RevertWhen_UnauthorizedRegisterAnimal() public {
        string[] memory ipfsHashes = new string[](1);
        ipfsHashes[0] = "QmHash1";

        vm.prank(user1);
        vm.expectRevert("Not authorized");
        shelter.registerAnimal("Test", 12, "Perro", "Mestizo", "Test", ipfsHashes);
    }

    function testReceiveEther() public {
        uint256 amount = 1 ether;

        vm.prank(user1);
        (bool success,) = address(shelter).call{value: amount}("");

        assertTrue(success);
        assertEq(address(shelter).balance, amount);
        assertEq(shelter.totalDonations(), amount);
    }

    function testFallbackFunction() public {
        uint256 amount = 0.5 ether;

        vm.prank(user1);
        (bool success,) = address(shelter).call{value: amount}("nonexistentFunction()");

        assertTrue(success);
        assertEq(address(shelter).balance, amount);
        assertEq(shelter.totalDonations(), amount);
    }
}
