//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

import "./ValidationContract.sol";

contract RegistryContract {
    event ValidationContractAddressUpdated(
        address newValidationContractAddress
    );

    address owner;
    address public validationContractAddress;

    constructor(address _validationContractAddress) public {
        owner = msg.sender;
        validationContractAddress = _validationContractAddress;
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
    ) public {
        require(dids[_deviceDID] == 0, "This DID already exists!");
        require(
            registry[_physicalID] == 0,
            "Theres already a DID registered for this pyhsicalId!"
        );

        checkValidity(_physicalID, _aktDID);

        registry[_physicalID] = _deviceDID;
        dids[_deviceDID] = _deviceDID;
    }

    function getDIDbyPhysicalID(uint256 _physicalID)
        public
        view
        returns (bytes32)
    {
        return registry[_physicalID];
    }

    function checkValidity(uint256 _physicalID, bytes32 _aktDID)
        internal
        view
        returns (bool)
    {
        ValidationContract v = ValidationContract(validationContractAddress);

        bool enabledDeviceAktDid = v.isAllowed(_physicalID, _aktDID);

        require(
            enabledDeviceAktDid == true,
            "This _physicalID is not enabled for registering"
        );
    }
}
