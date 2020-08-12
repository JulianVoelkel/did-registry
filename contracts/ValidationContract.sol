//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

/// @title A Validation for device DID registering
/// @author Julian Voelkel
/// @notice This contract is called bused to validate any DID registration
contract ValidationContract {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender does not equal contract owner.");
        _;
    }

    mapping(bytes32 => mapping(bytes32 => bool)) internal enabled;
    mapping(bytes32 => bytes32) public pids;

    /// @notice A function to register physicalIDs
    /// @param _aktDID The DID of the Activation Device to be allowed to register a Device DID for this physicalID
    /// @param _physicalID The physicalID to be enabled for registering
    function setPhysicalID(bytes32 _aktDID, bytes32 _physicalID)
        public
        onlyOwner
    {
        require(
            enabled[_aktDID][_physicalID] == false,
            "This phyisicalId has already been entered for registering"
        );

        require(pids[_physicalID] == 0, "This PID already exists!");

        enabled[_aktDID][_physicalID] = true;
        pids[_physicalID] = _physicalID;
    }

    /// @notice A function to check if a physicalID is valid to be registered
    /// @param _aktDID The DID of the Activation Device allowed to register a Device DID for this physicalID
    /// @param _physicalID The physicalID of the device
    function isAllowed(bytes32 _aktDID, bytes32 _physicalID)
        public
        view
        returns (bool)
    {
        require(
            enabled[_aktDID][_physicalID] == true,
            "This phyisicalId has not been entered for registering"
        );

        return true;
    }
}
