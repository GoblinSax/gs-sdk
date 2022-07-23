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

  it(`Check Approval`, function () {
    gs.checkApprovedNFT("")
  });
})