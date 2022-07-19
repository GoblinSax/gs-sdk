import { GoblinSaxAPI } from "@goblinsax/gs-sdk";
import { ethers } from "ethers";
import axios from 'axios';

/*
The following environment variables must be set for this to function properly:

**ETH_KEY:** Ethereum Private Key (starting with 0x) of user's account. In a browser implementation, this will user's wallet instead of private key
**GS_RINKEBY_API:** API for GS endpoint
**INFURA_API:** Infura API

Alternatively you can hardcore this or implement this differently.

*/

async function createLoan(gs, collection, id, duration){
    let terms = await gs.getTerms(collection, id)

    if (await gs.checkApproved(collection) == false){
        await gs.approveSpending(collection)
    }

    let sel = terms['offers'][String(duration)][0]
    let loan = await gs.beginLoan(collection, id, duration, "0xb645001fc19bafec83c1ef2cb3bc3516c7e0916c", terms['price'] * 10**18 * sel['LTV'], sel['APR'], "0x0000000000000000000000000000000000000000")

}

async function main(network){
    let provider = new ethers.providers.InfuraProvider(network.toLowerCase(), process.env.INFURA_API)
    let signer = new ethers.Wallet(process.env.ETH_KEY, provider);


    let gs = new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, network)

    let whitelist = await gs.getWhitelist()

    let owned_nfts;

    if (network == 'MAINNET') 
        owned_nfts = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${signer.address}`)
    else if (network == 'RINKEBY')
        owned_nfts = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?format=json&owner=${signer.address}`)


    let ownedWhitelist = []


    for (let asset of owned_nfts['data']['assets']){
        if (Object.values(whitelist).includes(asset['collection']['slug'])){
            ownedWhitelist.push({'collection': asset['asset_contract']['address'], 'id': asset['token_id'], 'slug': asset['collection']['slug']})
        }
    }
   
    if (ownedWhitelist.length > 0){
        let curr = ownedWhitelist[0]
        await createLoan(gs, curr['collection'],  curr['id'], 7)
    }
}


main('RINKEBY')