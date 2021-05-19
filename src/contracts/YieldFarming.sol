// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


import "./AmongusToken.sol";
import "./StableToken.sol";


contract YieldFarming {
        
        string public name = "Dapp Farm Token"; 
        address public owner;

        StableToken public stableToken; 
        AmongusToken public amongusToken;

        address[] public deposers;
        mapping(address => uint) public deposingBalance;
        mapping(address => bool) public hasDeposited;
        mapping(address => bool) public isDeposing;

        constructor(StableToken _stableToken, AmongusToken _amongusToken) {
            stableToken = _stableToken; 
            amongusToken = _amongusToken;
            owner = msg.sender;
        }

        function deposeTokens(uint _amount) public{
            // To depose, you need to depose more than 0

            require(_amount > 0, "amount cannot be 0");

            // Trasnfer stable tokens to this contract for deposing
            stableToken.transferFrom(msg.sender, address(this), _amount);

            // Update deposing balance
            deposingBalance[msg.sender] = deposingBalance[msg.sender] + _amount;

            // Add user to deposers array *only* if they haven't deposed already
            if(!hasDeposited[msg.sender]) {
                deposers.push(msg.sender);
            }

            // Update depose status
            isDeposing[msg.sender] = true;
            hasDeposited[msg.sender] = true;
        }

         // undepose Tokens (Withdraw)
        function undeposeTokens() public {
            // Fetch staking balance
            uint user_balance = deposingBalance[msg.sender];
           
            // Can't have less than 0 staked tokens
            require(user_balance > 0, "Kinda SUS, where is your balance?");

            // Transfer stable tokens to this contract for staking
            stableToken.transfer(msg.sender, user_balance);

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
                amongusToken.transfer(recipient, intrest);
                }
            }
        }
}