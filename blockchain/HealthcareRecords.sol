// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Phase 2 placeholder: On-chain health record registry mapping record CIDs to owners.
contract HealthcareRecords {
    struct RecordRef {
        address owner; // patient address
        string cid;    // IPFS CID
        uint256 createdAt;
    }

    mapping(bytes32 => RecordRef) public records; // key: keccak256(cid)

    event RecordRegistered(address indexed owner, string cid);

    function register(string calldata cid) external {
        bytes32 key = keccak256(abi.encodePacked(cid));
        require(records[key].createdAt == 0, "exists");
        records[key] = RecordRef({ owner: msg.sender, cid: cid, createdAt: block.timestamp });
        emit RecordRegistered(msg.sender, cid);
    }
}
