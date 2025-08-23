// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Phase 2 placeholder: Access grants for record IDs between patients and doctors.
contract AccessControlHRS {
    mapping(bytes32 => mapping(address => bool)) public access; // recordKey => doctor => allowed

    event AccessGranted(bytes32 indexed recordKey, address indexed doctor);
    event AccessRevoked(bytes32 indexed recordKey, address indexed doctor);

    function grant(bytes32 recordKey, address doctor) external {
        access[recordKey][doctor] = true;
        emit AccessGranted(recordKey, doctor);
    }

    function revoke(bytes32 recordKey, address doctor) external {
        access[recordKey][doctor] = false;
        emit AccessRevoked(recordKey, doctor);
    }

    function hasAccess(bytes32 recordKey, address doctor) external view returns (bool) {
        return access[recordKey][doctor];
    }
}
