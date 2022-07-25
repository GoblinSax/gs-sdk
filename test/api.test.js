import { GoblinSaxAPI } from "../src/index.js";
import { strict as assert } from 'assert';
import { ethers } from "ethers";

let gs;
let provider;
let signer;

describe('API Tests', function () {
  
  before(function () {
    provider = new ethers.providers.InfuraProvider ("rinkeby", process.env.INFURA_API )
    signer = new ethers.Wallet(process.env.ETH_KEY, provider);
    gs = new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'RINKEBY')
  });

  it(`Initialization`, function () {
    assert.throws(function () { new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'XXX') }, Error, "Error: version must be one of RINKEBY or MAINNET");
    new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'RINKEBY') //no error
    new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'MAINNET') //no error
  });

  it('Whitelist', async () => {
    let whitelist = await gs.getWhitelist()
    assert.equal(Object.values(whitelist)[0], "multifaucet-nft-q55yxxitoz")
    assert.equal(Object.keys(whitelist)[0], "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b")
    console.log(whitelist)
  });

  it('Check Approval', async () => {
    await gs.approveSpendingNFT("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b")
    //Manually ensure this is the case for ETH_KEY

    assert.equal(await gs.checkApprovedNFT("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b"), true) 
    assert.equal(await gs.checkApprovedNFT("0x8e9269bbd0a6e7a3817048e9f9199c5542257ded"), false) 
  });

  it('Get Loans', async () => {
    let allLoans = await gs.getLoans(process.env.ALCHEMY_API)
        
    for (let item_id in allLoans){
      assert.equal(Number.isInteger(parseInt(item_id)), true) 
      assert.equal(allLoans[item_id]['loanDuration'] > 0, true) //as data is direct from niftfi contract, just checking that data is being received
    }
  });

  it('Loan Terms', async () => {
    this.timeout(5000);
    let terms = await gs.getTerms('0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b', 1)
    assert.equal(terms.price, 0.1)
    console.log(terms['offers']['7'])
    assert.equal(terms['offers']['7'][0]['LTV'], 0.1)
    assert.equal(terms['offers']['7'][0]['APR'], 10) 

  });

  it('Create and Repay Loans',async () => {
    //tested on the hardhat fork repository linked and on example/
  })


})