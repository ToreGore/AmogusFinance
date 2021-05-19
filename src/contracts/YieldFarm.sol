// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "./AmogusToken.sol";
import "./StableToken.sol";

contract YieldFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    AmogusToken public amogusToken;
    StableToken public stableToken;

    address[] public deposers;
    mapping(address => uint) public deposingBalance;
    mapping(address => bool) public hasDeposed;
    mapping(address => bool) public isDeposing;

    constructor(AmogusToken _amogusToken, StableToken _stableToken){
        amogusToken = _amogusToken;
        stableToken = _stableToken;
        owner = msg.sender;
    }

    function deposeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        stableToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        deposingBalance[msg.sender] = deposingBalance[msg.sender] + _amount;

        // Add user to deposers array *only* if they haven't staked already
        if(!hasDeposed[msg.sender]) {
            deposers.push(msg.sender);
        }

        // Update staking status
        isDeposing[msg.sender] = true;
        hasDeposed[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function undeposeTokens() public {
        // Fetch staking balance
        uint balance = deposingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        stableToken.transfer(msg.sender, balance);

        // Reset staking balance
        deposingBalance[msg.sender] = 0;

        // Update staking status
        isDeposing[msg.sender] = false;
    }

    // Issuing Tokens 
        function issueToken() public {
            //only owner can call this function 
            require(msg.sender == owner, "caller must be the owner"); 

            uint total_deposited_balance = 0;

            //calculate total amount of deoposited balance of all users together 
            for(uint i=0; i < deposers.length; i++) {
                total_deposited_balance = total_deposited_balance + deposingBalance[deposers[i]]; 
            }

            // send intrest tokens (amonugsTokens) to the users that deposited stable tokens
            for (uint i = 0; i < deposers.length; i++){
                address recipient = deposers[i]; 
                uint balance = deposingBalance[recipient]; 

                //calculate intrest to send to the different users 
                uint intrest = ((balance / total_deposited_balance) * balance ) / 10; 

                if(balance >0){
                amogusToken.transfer(recipient, intrest);
                }
            }
        }
}
