
  # Goblin Sax SDK
A javascript library to take loans on NFTs from Goblin Sax. The Goblin Sax SDK requires Goblin Sax API Key. [Contact Us](https://discord.com/invite/GS6rvrvb9B) if you don't have it.

![](https://i.imgur.com/NmneTx4.png)

Please note that the SDK is undergoing heavy changes and is in beta. Use at your own risk.
## Install
> npm i @goblinsax/gs-sdk

## Custom Install
> npm run build

## Example
**examples/example.js:** 
ECMA script for getting the goblin sax whitelist, creating a loan and repaying it. 

**example/forked-loan:**
For a hardhat test on the mainnet fork using CommonJS.

**example/loan-app:**
An example Next JS app for getting the goblin sax whitelist, creating a loan and repaying it. 

## Getting Started

An ethers provider, Goblin Sax API key and the current network ("RINKEBY" or "MAINNET") should be passed to instantiate the API.

**ECMA:**  

    import { GoblinSaxAPI } from "@goblinsax/gs-sdk";
    let gs = new GoblinSaxAPI(<ethers-provider>, <goblin-sax-api-key>, <MAINNET | RINKEBY>)

**CommonJS:**
  
    const { GoblinSaxAPI } = require("@goblinsax/gs-sdk");
    let gs = new GoblinSaxAPI(<ethers-provider>, <goblin-sax-api-key>, <MAINNET | RINKEBY>)


#### `gs.getWhitelist()`

Returns assets Goblin Sax is currently providing loans on.

**Returns:**

> {"0xd4e4078ca3495de5b1d4db434bebc5a986197782": "autoglyphs", "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7": "meebits", "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e": "doodles-official", "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6": "cryptopunks", "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "boredapeyachtclub", "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb": "veefriends", "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b": "clonex", "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "mutant-ape-yacht-club", "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270": "ringers-by-dmitri-cherniak", "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a": "chromie-squiggle-by-snowfro"}

Response is a dictionary of collection address and slug. Once the whitelist is extracted, user's wallet must be viewed to see the assets they own. Refer to example/examples.js for an implementation.
  
  

#### `gs.getTerms(collection, id)`

Returns terms GS provides loan on for that asset

**Example:**

> {   price: 0.1,   offers: {
>     '7': [ [
					  { LTV: 0.1, APR: 10 },
					  { LTV: 0.2, APR: 10 },
					  { LTV: 0.3, APR: 10 },
					  { LTV: 0.4, APR: 10 },
					  { LTV: 0.55, APR: 10 }
					] ],
>    ...} }

Price is Goblin Sax's valuation for that asset. Inside the offer dictionary, key is duration GS is willing to provide loans for. LTV and APRs are the list of LTV and APR GS is willing to provide. 

#### `gs.beginLoan(collection, id, duration, borrowerAddress, principal, apr, referral)`
Begin Loan for a given NFT collection id. Duration in minutes, borrower address, Pricipal in WEI, APR in percentage (eg 10) and your ETH to receive the referral comission must be included.


#### `gs.getLoans(ALCHEMY_API)`

Returns all active loans done by the user. Alchemy API is used for this purpose and must be provided.
**Example:**

> {   '8197':   {loanPrincipalAmount: BigNumber { _hex:
> '0x2386f26fc10000', _isBigNumber: true },
>     maximumRepaymentAmount: BigNumber { _hex: '0x239863ae87c9a4', _isBigNumber: true },
>     nftCollateralId: BigNumber { _hex: '0x137167', _isBigNumber: true },
>     loanERC20Denomination: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
>     loanDuration: 604800,
>     loanInterestRateForDurationInBasisPoints: 0,
>     loanAdminFeeInBasisPoints: 500,
>     nftCollateralWrapper: '0xcde60C2C4D52E08706786A3CAe2726E13D01299f',
>     loanStartTime: BigNumber { _hex: '0x62db2e24', _isBigNumber: true },
>     nftCollateralContract: '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b',
>     borrower: '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd'} ,
>     ...
>     }
#### `gs.repayLoan(loanId)`
 The loanId to repay from must be passed to create the repayment.

## Tests
Local Tests are done on the Rinkeby network and makes assumptions about the state of the wallet. After the environment variables are set and assumptions verified, tests can be run using:
> npm test
  
A more advanced test on hardhat fork with every details is in example/forked-loan