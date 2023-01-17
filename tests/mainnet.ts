import { GoblinSaxAPI, Version } from "../src/index";
import { strict as assert } from 'assert';
import { ethers } from "ethers";
import * as dotenv from 'dotenv'

dotenv.config()



let provider = new ethers.providers.AlchemyProvider(
  Version.MAINNET,
  process.env.ALCHEMY_API
);
let signer = new ethers.Wallet(process.env.ETH_KEY as string, provider);
let gs = new GoblinSaxAPI(signer as any, process.env.MAINNET_API as string, Version.MAINNET);


describe('API Tests', () => {

  it('Whitelist', async () => {
    let whitelist = await gs.getWhitelist()
    assert.equal(whitelist.length > 1, true)

  });

  it('Terms',async () => {
    let terms = await gs.getTerms('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', '4255')
    assert.equal(terms['offers']['30'].length > 1, true)
  })
})