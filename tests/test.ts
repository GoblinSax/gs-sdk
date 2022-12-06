import { GoblinSaxAPI, Version } from "../src/index";
import { strict as assert } from 'assert';
import { ethers } from "ethers";
import * as dotenv from 'dotenv'

dotenv.config()



let provider = new ethers.providers.AlchemyProvider(
  Version.GOERLI,
  process.env.ALCHEMY_API
);
let signer = new ethers.Wallet(process.env.ETH_KEY as string, provider);  
let gs = new GoblinSaxAPI(signer as any, "", Version.GOERLI);


describe('API Tests', () => {

  it('Whitelist', async () => {
    let whitelist = await gs.getWhitelist()
    assert.equal(whitelist[0]['slug'], "multifaucet-nft-v4")
    assert.equal(whitelist[0]['asset_contract'], "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b")
  });

  it('Loan Terms', async () => {
    let terms = await gs.getTerms('0x904490AB5Cd0d7F6E2264b5D34D46a9C1bB30594', '81')
    assert.equal(terms.price, 0.2)
    assert.equal(terms['offers']['7'][0]['LTV'], 0.5)
    assert.equal(terms['offers']['7'][0]['APR'], 50) 
    assert.equal(terms['offers']['7'][0]['FEE'], '0.000100') 
  });

  it('Create Loans',async () => {
    //verify both bnpl and basic loans
    let offer = await gs.createOffer('0x904490AB5Cd0d7F6E2264b5D34D46a9C1bB30594', '81', '7', '0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '100000000000000000', 50)
    assert.equal(offer.offer.loanPrincipalAmount, '100000000000000000')
    assert.equal(offer.offer.maximumRepaymentAmount, '100958904109589040')
    assert.equal(offer.offer.nftCollateralId, '81')

    assert.equal(offer.serviceFee.chainId, 5)

    let timestamp = new Date().getTime() / 1000;
    assert.equal(offer.serviceFee.signatureExpiry > timestamp, true)
    assert.equal(offer.signature.expiry > timestamp, true)

    assert.equal(offer.serviceFee.signature.length > 10, true)
    assert.equal(offer.signature.signature.length > 10, true)

  })
})