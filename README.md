# Goblin Sax SDK

A javascript library to take loans on NFTs from Goblin Sax. The mainnet version of Goblin Sax SDK requires Goblin Sax API Key. [Contact Us](https://discord.com/invite/GS6rvrvb9B) if you don't have it.

![](https://i.imgur.com/NmneTx4.png)

## Install

> npm i @goblinsax/gs-sdk

## Custom Install

Install dev dependecies:

> npm install --dev

Then build using:

> npm run build

## Tests

Copy .env-example and create .env. Tests are done on the GOERLI network. After the environment variables are set, tests can be run using:
> npm test

## Example

**examples/example.ts:**
A script for using the SDK to take loans

**examples/exampleBnpl.ts:**
A script for using the SDK to make a BNPL

## Getting Started

An ethers provider, Goblin Sax API key and the current network ("GOERLI" or "MAINNET") should be passed to instantiate the API.

**ECMA:**

    import { GoblinSaxAPI } from "@goblinsax/gs-sdk";
    let gs = new GoblinSaxAPI(<ethers-signer>, <goblin-sax-api-key>, <MAINNET | GOERLI>)

**CommonJS:**

    const { GoblinSaxAPI } = require("@goblinsax/gs-sdk");
    let gs = new GoblinSaxAPI(<ethers-signer>, <goblin-sax-api-key>, <MAINNET | GOERLI>)


#### `gs.getWhitelist()`

Returns assets Goblin Sax is currently providing loans on.

**Returns:**

> {"0xd4e4078ca3495de5b1d4db434bebc5a986197782": "autoglyphs", "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7": "meebits", "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e": "doodles-official", "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6": "cryptopunks", "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "boredapeyachtclub", "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb": "veefriends", "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b": "clonex", "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "mutant-ape-yacht-club", "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270": "ringers-by-dmitri-cherniak", "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a": "chromie-squiggle-by-snowfro"}

Response is a dictionary of collection address and slug. Once the whitelist is extracted, user's wallet must be viewed to see the assets they own. Refer to example/examples.js for an implementation.

#### `gs.getTerms(collection, id)`

Returns terms GS provides loan on for that asset

**Example:**

> { price: 0.1, offers: {
> '7': [ [

    				  { LTV: 0.1, APR: 10 },
    				  { LTV: 0.2, APR: 10 },
    				  { LTV: 0.3, APR: 10 },
    				  { LTV: 0.4, APR: 10 },
    				  { LTV: 0.55, APR: 10 }
    				] ],

> ...} }

Price is Goblin Sax's valuation for that asset. Inside the offer dictionary, key is duration GS is willing to provide loans for. LTV and APRs are the list of LTV and APR GS is willing to provide.

Based on this Whitelist and Terms, Goblin Sax SDK Offers two ways of interaction.

## Loans
These are regular loans as provided by NFTFi that allows users to borrow an NFT for a provided duration.

#### `gs.beginLoan(collection, id, duration, borrowerAddress, principal, apr, referral)`

Begin Loan for a given NFT collection id. Duration in minutes, borrower address, Pricipal in WEI, APR in percentage (eg 10) and your ETH to receive the referral comission must be included.

#### `gs.getLoans(ALCHEMY_API)`

Returns all active loans done by the user. Alchemy API is used for this purpose and must be provided.
**Example:**

> { '8197': {loanPrincipalAmount: BigNumber { \_hex:
> '0x2386f26fc10000', \_isBigNumber: true },
> maximumRepaymentAmount: BigNumber { \_hex: '0x239863ae87c9a4', \_isBigNumber: true },
> nftCollateralId: BigNumber { \_hex: '0x137167', \_isBigNumber: true },
> loanERC20Denomination: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
> loanDuration: 604800,
> loanInterestRateForDurationInBasisPoints: 0,
> loanAdminFeeInBasisPoints: 500,
> nftCollateralWrapper: '0xcde60C2C4D52E08706786A3CAe2726E13D01299f',
> loanStartTime: BigNumber { \_hex: '0x62db2e24', \_isBigNumber: true },
> nftCollateralContract: '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b',
> borrower: '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd'} ,
> ...
> }

#### `gs.repayLoan(loanId)`

The loanId to repay from must be passed to create the repayment.

## Buy now, pay later (BNPL)

Buy now pay later is a new functionality developed by Goblin sax that allows to buy an asset today and pay for it later on.

To do so, a user has to find an asset of a collection whitelisted by Goblin sax and listed for ser in a marketplace. At the moment we only support Opensea.
Then, it has to call `gs.bnplAllowance` to approve the bnpl contract and after the approval was done, call `gs.bnplOS` to buy the asset.

After the buy was done, the user will have an active loan to pay. Once the loan is paid the asset will be transferred to the user's wallet in the same transaction.

### `getOSListing(collection: string, assetId: string)`

This function receives the NFT collection address and the assetId. If the asset is listed, this function will return the listing information from Opensea.

### `bnplAllowance(token: string, marketPrice: string, principal: string, gsFee: string): Promise<{ isAllowanceRequired: boolean; approve: () => Promise<ethers.ContractTransaction>;}>`

This function checks if the wallet connected has a limit allowed for the bnpl contract to take a loan in the modality of BNPL. It receives the token in which the asset has to be paid, the price of the asset listed in the market, the principal (Goblin sax valuation \* LTV), and the Goblin sax Fee. It returns an object with two values: `isAllowanceRequired` a boolean value and `approve`, a function that if called will trigger a transaction to make the approval.

### `bnplOS(collection: string, assetId: string, duration: string, borrowerAddress: string, principal: string, apr: number): Promise<ethers.ContractTransaction>`

This function is called to trigger a bnpl transaction for an asset in Opensea. It receives the collection address, the asset id, the duration of the loan, the address that will borrow the money, the principal and the APR. The `duration`, `borrowerAddress`, and `apr` values needed are obtained from calling `gs.getTerms(collection, id)`. Before calling this function make sure `gs.bnplAllowance(...)` returns `isAllowanceRequired == true`.

### `executeBnpl(collection: string, assetId: string, assetType: "ERC721" | "ERC1155", duration: string, borrowerAddress: string, principal: string, apr: number, buyData: string, module: string): Promise<ethers.ContractTransaction>

This function is thought to be used by marketplaces seeking for integration with Goblin sax. `module` is the address of a module following this interface [IMarketModule](https://github.com/GoblinSax/gs-bnpl-contracts/blob/main/src/interfaces/IMarketModule.sol). `buyData` is the encoded data of the `buy` function on the marketplace. The `duration`, `borrowerAddress`, and `apr` values needed are obtained from calling `gs.getTerms(collection, id)`. Before calling this function make sure `gs.bnplAllowance(...)` returns `isAllowanceRequired == true`.
