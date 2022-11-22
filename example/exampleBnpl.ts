import { GoblinSaxAPI, GS_API_GetLoanTerms, Version } from "../src/index";
import { BigNumber, ethers } from "ethers";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

/*
    .env-example must be set to make this work
*/

function promiseTimeout(ms: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

const getPrincipal = (
  decimals: number,
  price: string,
  ltv: string
): BigNumber => {
  const priceBN = ethers.utils.parseUnits(price, decimals);
  const ltvBN = ethers.utils.parseUnits(ltv, decimals);
  return BigNumber.from(priceBN.mul(ltvBN).toString().slice(0, -decimals));
};

async function main(version: Version) {
  let provider = new ethers.providers.AlchemyProvider(
    version,
    process.env.ALCHEMY_API
  );

  let signer = new ethers.Wallet(process.env.ETH_KEY as string, provider);
  const walletAddress = await signer.getAddress();

  let gs = new GoblinSaxAPI(signer as any, "", Version.GOERLI);

  // NOTE: set collection and asset for the asset that is listed on opensea
  // You can mint an asset in Goerli for the BN whitelisted ERC721 collection from here:
  // https://goerli.etherscan.io/address/0x904490AB5Cd0d7F6E2264b5D34D46a9C1bB30594#writeContract
  // ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/SOME-NUMBER or any other metadata
  const COLLECTION_ADDRESS = "0x904490AB5Cd0d7F6E2264b5D34D46a9C1bB30594";
  const ASSET_ID = "11";

  // Get GS terms for the asset.
  const terms: GS_API_GetLoanTerms["body"] = await gs.getTerms(
    COLLECTION_ADDRESS,
    ASSET_ID
  );
  const offerKeys = Object.keys(terms.offers);
  const duration = offerKeys[0];
  const conditions = terms.offers[duration][0];

  const principal = getPrincipal(
    18,
    terms.price.toString(),
    conditions.LTV.toString()
  );

  // check opensea price.
  const osListing = await gs.getOSListing(COLLECTION_ADDRESS, ASSET_ID);
  const listingPrice = ethers.utils.parseUnits(
    osListing.current_price,
    18 // Hardcoded value for WETH
  );
  const fee = ethers.utils.parseUnits(conditions.FEE.toString(), 18);

  // approve if needed.
  const allowance = await gs.bnplAllowance(
    osListing.protocol_data.parameters.consideration[0].token,
    listingPrice.toString(),
    principal.toString(),
    fee.toString()
  );

  console.log("fee: ", fee.toString());

  // Delay to avoid http:429 response from Opensea
  await promiseTimeout(2000);

  if (allowance.isAllowanceRequired) {
    const res = await allowance.approve();
    await res.wait();
  }

  console.log({ duration });
  console.log({ p: principal.toString() });
  console.log({ apr: conditions.APR });
  // buy asset.
  const receipt = await gs.bnplOS(
    COLLECTION_ADDRESS,
    ASSET_ID,
    duration,
    walletAddress,
    principal.toString(),
    conditions.APR
  );

  console.log(receipt);
}

main(Version.GOERLI);
