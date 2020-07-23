//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

contract ValidationContract {
    address owner;
    bytes32 aktDID;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender does not equal contract owner.");
        _;
    }

    function setAktDID(bytes32 _aktDID) public onlyOwner {
        if (aktDID == bytes32(0)) {
            aktDID = _aktDID;
        } else {
            revert("Validation contract address can only be set initially.");
        }
    }

    mapping(uint256 => uint256) public physicalIDs;

    function setPhysicalID(uint256 _physicalID) public onlyOwner {
        require(
            physicalIDs[_physicalID] == 0,
            "This phyisicalId has already been entered for registering"
        );

        physicalIDs[_physicalID] = _physicalID;
    }

    function isAllowed(uint256 _physicalID, bytes32 _aktDID)
        public
        view
        returns (bool)
    {
        require(
            physicalIDs[_physicalID] == _physicalID,
            "This phyisicalId has not been entered for registering"
        );
        require(
            aktDID == _aktDID,
            "This Activation Device is not allowed to register IDs"
        );

        return true;
    }
}
