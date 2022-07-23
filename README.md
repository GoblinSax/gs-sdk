
# Goblin Sax SDK

A javascript library to take loans on NFTs from Goblin Sax. The Goblin Sax SDK requires Goblin Sax API Key. [Contact Us](https://discord.com/invite/GS6rvrvb9B) if you don't have it.  Refer to examples/example.js for a complete flow -- getting the goblin sax whitelist, creating a loan and repaying it.

## Install
> npm i @goblinsax/gs-sdk

## Getting Started

    import { GoblinSaxAPI } from  "@goblinsax/gs-sdk";
    let gs = new GoblinSaxAPI(<ethers-provider>, <goblin-sax-api-key>, <MAINNET | RINKEBY>)
    
An ethers provider, Goblin Sax API key and the current network ("RINKEBY" or "MAINNET") should be passed to instantiate the API.
  
Refer to examples/example.js for a loan example on rinkeby thru a terminal script. Once initialized the following methods can be used:

#### `gs.getWhitelist()`
Returns assets Goblin Sax is currently providing loans on.
**Returns:** 
#### `gs.getTerms(collection, id)`
Returns assets Goblin Sax is currently providing loans on.
  
  Example:
    

  

A detailed explanation for the SDK is [here](https://equable-song-6a9.notion.site/Goblin-Sax-Integration-Guide-b7e52f7c9f62438692ecf80b8e2ac873#712bfefd31e04938866cc4246eb3659a). Alternatively, the endpoints explained there can be used to manually create the loan.

  

A hardhat fork implementation on the mainnet and a react sample app will be added shortly.
