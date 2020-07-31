//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.7.0;

import "./ValidationContract.sol";

contract RegistryContract {
    event ValidationContractAddressUpdated(
        address newValidationContractAddress
    );

    address owner;
    address public validationContractAddress;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender does not equal contract owner.");
        _;
    }

    mapping(uint256 => bytes32) public registry;
    mapping(bytes32 => bytes32) public dids;

    function registerDevice(
        bytes32 _deviceDID,
        uint256 _physicalID,
        bytes32 _aktDID
    ) public returns (bytes32) {
        require(dids[_deviceDID] == 0, "This DID already exists!");
        require(
            registry[_physicalID] == 0,
            "Theres already a DID registered for this pyhsicalId!"
        );

        checkValidity(_physicalID, _aktDID);

        registry[_physicalID] = _deviceDID;
        dids[_deviceDID] = _deviceDID;

    return _deviceDID;
    }

    function getDIDbyPhysicalID(uint256 _physicalID) public view returns (bytes32)
    {
        require(registry[_physicalID] != 0, "This DID is not registered");
        return registry[_physicalID];
    }

    function getValidationContractAddress() public view returns (address){
        return validationContractAddress;
    }

    function checkValidity(uint256 _physicalID, bytes32 _aktDID)
        internal
        view
        returns (bool)
    {
        ValidationContract v = ValidationContract(validationContractAddress);

        bool enabledDeviceAktDid = v.isAllowed(_aktDID, _physicalID);

        require(
            enabledDeviceAktDid == true,
            "This _physicalID is not enabled for registering"
        );
    }
    
        /**
     * Initially set contract address
     */
    function setValidationContractAddress(address newAddress) public onlyOwner {
        if (validationContractAddress == address(0)) {
            validationContractAddress = newAddress;
        } else {
            revert("Validation contract address can only be set initially.");
        }
    }
}
