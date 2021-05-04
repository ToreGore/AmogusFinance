// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;


import "./AmongusToken.sol";
import "./StableToken.sol";


contract FarmToken {
        
        string public name = "Dapp Farm Token"; 

        StableToken public stableToken; 
        AmongusToken public amongusToken; 

        constructor(StableToken _stableToken, AmongusToken _amongusToken){
            stableToken = _stableToken; 
            amongusToken = _amongusToken;

        }

}