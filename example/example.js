import { GoblinSaxAPI } from "@goblinsax/gs-sdk";
import { ethers } from "ethers";

/*
The following environment variables must be set for this to function properly:

**ETH_KEY:** Ethereum Private Key (starting with 0x) of user's account. In a browser implementation, this will user's wallet instead of private key
**GS_RINKEBY_API:** API for GS endpoint
**INFURA_API:** Infura API

Alternatively you can hardcore this or implement this differently.

*/


async function main(collection, id, duration){
    let provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API)
    let signer = new ethers.Wallet(process.env.ETH_KEY, provider);



    let gs = new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'RINKEBY')
    let terms = await gs.getTerms(collection, id)

    if (await gs.checkApproved() == false){
        await gs.approveSpending()
    }

    let sel = terms['offers'][String(duration)][0]
    let loan = await gs.beginLoan(collection, id, duration, "0xb645001fc19bafec83c1ef2cb3bc3516c7e0916c", terms['price'] * 10**18 * sel['LTV'], sel['APR'], "0x0000000000000000000000000000000000000000")
}


main('0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b', 	1274211, 7)