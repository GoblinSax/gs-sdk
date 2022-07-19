# Goblin Sax SDK
  
A javascript library to take loans on NFTs from Goblin Sax. The library can installed thru npm using:

 > npm i @goblinsax/gs-sdk

This library is actively under work, and bugs are expected. The end points will also change. A detailed explanation for the SDK is [here](https://equable-song-6a9.notion.site/Goblin-Sax-Integration-Guide-b7e52f7c9f62438692ecf80b8e2ac873#712bfefd31e04938866cc4246eb3659a). Alternatively, the endpoints explained there can be used to manually create the loan.

Refer to examples/example.js for a loan example. The following environment variables must be set for this to function properly:

**ETH_KEY:** Ethereum Private Key (starting with 0x) of user's account. In a browser implementation, this will user's wallet instead of private key
**GS_RINKEBY_API:** API for GS endpoint
**INFURA_API:** Infura API


Todos:
1) Whitelist Functions
2) Bug Fixes. React Demo
3) Unit Tests, mainnet fork test
