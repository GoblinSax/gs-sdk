import { GoblinSaxAPI } from "../src/index.js";
import { strict as assert } from 'assert';
import { ethers } from "ethers";
import * as dotenv from 'dotenv'
dotenv.config()

let gs;
let provider;
let signer;

describe('API Tests', function () {
  
  before(function () {
    provider = new ethers.providers.InfuraProvider ("goerli", process.env.INFURA_API )
    signer = new ethers.Wallet(process.env.ETH_KEY, provider);
    gs = new GoblinSaxAPI(signer, "", 'GOERLI')
  });

  it(`Initialization`, function () {
    assert.throws(function () { new GoblinSaxAPI(signer, "", 'XXX') }, Error, "Error: version must be one of GOERLI or MAINNET");
    new GoblinSaxAPI(signer, "", 'GOERLI') //no error
  });

  it('Whitelist', async () => {
    let whitelist = await gs.getWhitelist()
    assert.equal(whitelist[0]['slug'], "multifaucet-nft-v4")
    assert.equal(whitelist[0]['asset_contract'], "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b")
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
    assert.equal(terms.price, 0.01)
    assert.equal(terms['offers']['7'][0]['LTV'], 0.1)
    assert.equal(terms['offers']['7'][0]['APR'], 10) 

  });

  it('Create and Repay Loans',async () => {
    //tested on the hardhat fork repository linked and on example/
  })


})