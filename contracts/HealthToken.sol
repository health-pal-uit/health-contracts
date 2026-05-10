// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HealthToken is ERC20, Ownable {
    event UserRewarded(address indexed user, uint256 amount);
    event UserDeducted(address indexed user, uint256 amount);

    constructor() ERC20("HealthToken", "HPT") Ownable(msg.sender) {}

    function rewardUser(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
        emit UserRewarded(user, amount);
    }

    function deductFromUser(address user, uint256 amount) external onlyOwner {
        _burn(user, amount);
        emit UserDeducted(user, amount);
    }
}
