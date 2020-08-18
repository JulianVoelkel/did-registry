//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

import "./ValidationContract.sol";

/// @title A Registration for Device DIDs
/// @author Julian Voelkel
/// @notice You can use this contract to register DIDs for Devices if they are enabled
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

    modifier onlyActivationDevice(address _activationDevice) {
        require(msg.sender == _activationDevice, "Sender does not equal Activation Device.");
        _;
    }

    mapping(bytes32 => bytes32) public registry;
    mapping(bytes32 => bool) public dids;

    /// @notice A function to register the DID which is only callable by the activation device itself
    /// @param _deviceDID The device's DID to be registered
    /// @param _physicalID The device's according physicalID
    /// @param _aktDID The DID of the used Activation Device
    /// @return The registered DID
    function registerDevice(
        bytes32 _deviceDID,
        bytes32 _physicalID,
        bytes32 _aktDID,
        address _activationDevice
    ) public onlyActivationDevice(_activationDevice) returns (bytes32) {

        require(dids[_deviceDID] == false, "This DID already exists!");
        require(
            registry[_physicalID] == 0,
            "There's already a DID registered for this physicalId!"
        );

        checkValidity(_physicalID, _aktDID);

        registry[_physicalID] = _deviceDID;
        dids[_deviceDID] = true;

        return _deviceDID;
    }

    /// @notice A function to return a DID by physicalID
    /// @param _physicalID The physicalID of the Device
    /// @return The devices DID
    function getDIDbyPhysicalID(bytes32 _physicalID)
        public
        view
        returns (bytes32)
    {
        require(registry[_physicalID] != 0, "This DID is not registered");
        return registry[_physicalID];
    }

    /// @notice A function to return the set validation contract address
    /// @return The address of the validation contract
    function getValidationContractAddress() public view returns (address) {
        return validationContractAddress;
    }

    /// @notice A function to determine if the registration is valid
    /// @param _physicalID The physicalID of the Device
    /// @param _aktDID The DID of the used Activation Device
    /// @return If registration is valid or not
    function checkValidity(bytes32 _physicalID, bytes32 _aktDID)
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

}
