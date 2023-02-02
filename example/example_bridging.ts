import { GoblinSaxAPI, Version } from "../src/index";
import { ethers } from "ethers";
import * as dotenv from 'dotenv'

dotenv.config()


async function do_it() {
    let provider = new ethers.providers.AlchemyProvider(
        Version.MAINNET,
        process.env.ALCHEMY_API
    );

    let signer = new ethers.Wallet(process.env.ETH_KEY as string, provider);
    let gs = new GoblinSaxAPI(signer as any, process.env.MAINNET_API as string, Version.MAINNET);

    let [tx_hash, quote] = await gs.bridgeFunds('100000000000000')

    console.log(tx_hash, quote)
    
    let status = await gs.bridgeStatus(tx_hash, quote)

    console.log(status.status)
}

do_it()