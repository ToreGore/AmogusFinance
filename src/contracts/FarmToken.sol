// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


import "./AmongusToken.sol";
import "./StableToken.sol";


contract FarmToken {
        
        string public name = "Dapp Farm Token"; 
        address public owner;

        StableToken public stableToken; 
        AmongusToken public amongusToken;

        address[] public stakers;
        mapping(address => uint) public stakingBalance;
        mapping(address => bool) public hasStaked;
        mapping(address => bool) public isStaking;

        constructor(StableToken _stableToken, AmongusToken _amongusToken) {
            stableToken = _stableToken; 
            amongusToken = _amongusToken;
            owner = msg.sender;
        }

        function stakeTokens(uint _amount) public{
            // To stake, you need to stake more than 0

            require(_amount > 0, "amount cannot be 0");

            // Trasnfer stable tokens to this contract for staking
            stableToken.transferFrom(msg.sender, address(this), _amount);

            // Update staking balance
            stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

            // Add user to stakers array *only* if they haven't staked already
            if(!hasStaked[msg.sender]) {
                stakers.push(msg.sender);
            }

            // Update staking status
            isStaking[msg.sender] = true;
            hasStaked[msg.sender] = true;
        }

         // Unstaking Tokens (Withdraw)
        function unstakeTokens() public {
            // Fetch staking balance
            uint user_balance = stakingBalance[msg.sender];
            uint total_balance = 0;
            //uint first_rate = 10;
            for (uint i=0; i < stakers.length; i++) {
                total_balance = total_balance + stakingBalance[stakers[i]];
            }
            uint interests = user_balance / total_balance;

            // The idea here is to receive an amount of stableTokens proportional to the amount staked

            // Can't have less than 0 staked tokens
            require(balance > 0, "Kinda SUS, where is your balance?");

            // Transfer stable tokens to this contract for staking
            amongusToken.transfer(msg.sender, balance * interests);

            // Reset staking balance
            stakingBalance[msg.sender] = 0;

            // Update staking status
            isStaking[msg.sender] = false;
        }


}