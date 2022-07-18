import { GoblinSaxAPI } from "gs-sdk";

async function main(){
    let gs = new GoblinSaxAPI(1, 2, 3)
    let terms = await gs.getTerms()
    console.log(terms)
}


main()