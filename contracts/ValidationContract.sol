//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.7.0;

contract ValidationContract {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender does not equal contract owner.");
        _;
    }
    
    mapping(bytes32 => mapping (uint256 => bool)) internal enabled;
    mapping(uint256 => uint256) public pids;

    function setPhysicalID(bytes32 _aktDID, uint256 _physicalID) public onlyOwner{
        
        require(pids[_physicalID] == 0, "This PID has already been enabled!");
        
        require(
            enabled[_aktDID][_physicalID] == false ,
            "This phyisicalId has already been entered for registering"
        );
        
        enabled[_aktDID][_physicalID] = true; 
        pids[_physicalID] = _physicalID;
        
    }
    
    function isAllowed(bytes32 _aktDID, uint256 _physicalID) public view returns (bool)
    {
        require(enabled[_aktDID][_physicalID] == true , "This phyisicalId has not been entered for registering");

        return true;
    }


}
