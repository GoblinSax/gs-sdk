export class GoblinSaxAPI{
    constructor(provider, apiKey, version){
        this.provider = provider
        this.apiKey = apiKey
        this.version = version
    }

    async getTerms(){
        return this.version;
    }
}