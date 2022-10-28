import axios from 'axios';
import { ethers } from "ethers";
import { NFTFI_ABI, ERC721_ABI, ERC20_ABI } from "./abi.js";

export class GoblinSaxAPI{
    constructor(provider, apiKey, version='MAINNET'){
        this.provider = provider
        this.apiKey = apiKey
        this.version = version

        console.log(this.version)

        if (this.version == 'GOERLI'){
            this.nftfi = "0x77097f421CEb2454eB5F77898d25159ff3C7381d"
            this.ENDPOINT = "https://0em9k7cjm4.execute-api.us-east-1.amazonaws.com/prod"
            this.note = "0x88bffd4154ecf7545741bf6f3ec9f7e2e11602db"
            this.weth = "0x0bb7509324ce409f7bbc4b701f932eaca9736ab7"
        }
        else if (this.version == 'MAINNET'){
            this.nftfi = "0x8252df1d8b29057d1afe3062bf5a64d503152bc8"
            this.ENDPOINT = "https://atuz4790j2.execute-api.us-east-1.amazonaws.com/prod"
            this.note = "0x5660e206496808f7b5cdb8c56a696a96ae5e9b23"
            this.weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        }
        else {
            throw new Error("version must be one of GOERLI or MAINNET")
        }

        this.address = ""
        this.nftfi_contract = new ethers.Contract( this.nftfi , NFTFI_ABI , this.provider )
        this.weth_contract = new ethers.Contract( this.weth , ERC20_ABI , this.provider )
    }

    async getWhitelist(){
        let res;

        if (this.version == 'MAINNET') 
            res = await axios.get('https://api.goblinsax.xyz/collections/')
        else if (this.version == 'GOERLI')
            res = await axios.get('https://api.goblinsax.xyz/collections_goerli/')
        
        return res.data
    }

    async getTerms(collection, id){
        let erc721_contract = new ethers.Contract( collection , ERC721_ABI , this.provider )

        let res = await axios.get(`${this.ENDPOINT}/api/get-loan-terms?address=${collection}&id=${id}`, {headers: {'x-api-key': this.apiKey}})
        
        if (res['data']['success'] == true){
            return res['data']['body']
        }
        else{
            throw new Error(res['data']['message'])
        }
    }

    async repayLoan(loanId){
        this.nftfi_contract.payBackLoan(loanId)
    }

    async getLoans(apiKey){
        let baseURL;

        if (this.version == 'GOERLI'){           
            baseURL = `https://eth-goerli.alchemyapi.io`;
        } else if (this.version == 'MAINNET'){
            baseURL = `https://eth-mainnet.alchemyapi.io`;
        }        
        let url = `${baseURL}/nft/v2/${apiKey}/getNFTs/?owner=0xb66284947F9A35bD9FA893D444F19033FeBdA4A1&contractAddresses[]=${this.note}`;
        let response = await axios.get(url);

        let collections = response.data['ownedNfts']

        let curr

        while ('pageKey' in response.data){
            url = `${baseURL}/nft/v2/${apiKey}/getNFTs/?owner=0xb66284947F9A35bD9FA893D444F19033FeBdA4A1&contractAddresses[]=${this.note}`;
            curr = await axios.get(url);
            collections.push(curr.data)
        }

        let all_loans = {}

        for (let collection of collections){
            let id = collection['title'].split(" ")[2].replace("#", "")
            let loan = await this.nftfi_contract.loanIdToLoan(id)
            if (loan['borrower'].toLowerCase() == this.provider.address.toLowerCase()){
                all_loans[id] = loan
            }
        }

        return all_loans
    }

    async checkApprovedWETH(){
        let x = await this.weth_contract.allowance(this.provider.address, this.nftfi)

        //compare with a very large amount whose size is unlikely in a single loan
        if (x < 10**18 * 1000){
            return false
        }
        else {
            return true
        }
    }

    async approveSpendingWETH(){
        await this.weth_contract.approve(this.nftfi, ethers.constants.MaxUint256)
    }

    async checkApprovedNFT(collection){
        try{
            let erc721_contract = new ethers.Contract( collection , ERC721_ABI , this.provider )
            return await erc721_contract.isApprovedForAll(this.provider.address, this.nftfi)
        } 
        catch (error) 
        {
            return false
        }
    }

    async approveSpendingNFT(collection){
        let erc721_contract = new ethers.Contract( collection , ERC721_ABI , this.provider )
        await erc721_contract.setApprovalForAll(this.nftfi, true)
    }

    async beginLoan(collection, id, duration, borrowerAddress, principal, apr, referral){
        principal = principal.toLocaleString('fullwide', {useGrouping:false})
        let url = `${this.ENDPOINT}/api/create-offer?address=${collection}&id=${id}&duration=${duration}&borrowerAddress=${borrowerAddress}&principal=${principal}&apr=${apr}`
        let res = await axios.get(url, {headers: {'x-api-key': this.apiKey}})

        if (res['data']['success'] == true){
            let loan = res['data']['body']
            let loan_details = loan['result']['terms']['loan']
                        
            let offer = {loanPrincipalAmount: loan_details['principal'], maximumRepaymentAmount: loan_details['repayment'], nftCollateralId: loan['result']['nft']['id'], nftCollateralContract: loan['result']['nft']['address'], loanDuration: loan_details['duration'], loanAdminFeeInBasisPoints: loan['result']['nftfi']['fee']['bps'], loanERC20Denomination: loan_details['currency'], referrer: loan['result']['referrer']['address']}
            let BorrowerSettings = {revenueSharePartner: loan['result']['referrer']['address'], referralFeeInBasisPoints: 0} //will likely be modified
            
            let signature = {nonce: loan['result']['lender']['nonce'], expiry: loan_details['expiry'], signer: loan['result']['lender']['address'], signature: loan['result']['signature']}

            await this.nftfi_contract.acceptOffer(offer, signature, BorrowerSettings) //this will create the loans
        }
        else{
            console.log(res['data'])
            process.exit(1);
        }
    }
}