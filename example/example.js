import { GoblinSaxAPI } from "@goblinsax/gs-sdk";
import { ethers } from "ethers";


async function main(){
    let provider = new ethers.providers.InfuraProvider("rinkeby", process.env.INFURA_API)
    let signer = new ethers.Wallet(process.env.ETH_KEY, provider);



    let gs = new GoblinSaxAPI(signer, process.env.GS_RINKEBY_API, 'RINKEBY')

    let terms = await gs.getTerms("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", 7)
    let sel = terms['offers']['7'][0]
    let loan = await gs.beginLoan("0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", 7, 7, "0xb645001fc19bafec83c1ef2cb3bc3516c7e0916c", terms['price'] * 10**18 * sel['LTV'], sel['APR'], "0x0000000000000000000000000000000000000000")




}


main()