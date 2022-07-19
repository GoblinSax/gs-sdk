import axios from 'axios';
import { ethers } from "ethers";
import { NFTFI_ABI, ERC721_ABI } from "./abi.js";

export class GoblinSaxAPI{
    constructor(provider, apiKey, version='MAINNET'){
        this.provider = provider
        this.apiKey = apiKey
        this.version = version

        if (this.version == 'RINKEBY'){
            this.nftfi = "0x33e75763F3705252775C5AEEd92E5B4987622f44"
            this.ENDPOINT = "https://sdm6h8zgmd.execute-api.us-east-1.amazonaws.com/prod"

        }
        else if (this.version == 'MAINNET'){
            this.nftfi = "0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280"
            this.ENDPOINT = "https://atuz4790j2.execute-api.us-east-1.amazonaws.com/prod"
        }
        else {
            throw new Error("version must be one of RINKEBY or MAINNET")
        }
    }

    async getTerms(collection, id){
        let res = await axios.get(`${this.ENDPOINT}/api/get-loan-terms?address=${collection}&id=${id}`, {headers: {'x-api-key': this.apiKey}})
        
        if (res['data']['success'] == true){
            return res['data']['body']
        }
        else{
            throw new Error(res['data']['message'])
        }
    }

    async beginLoan(collection, id, duration, borrowerAddress, principal, apr, referral){
        let url = `${this.ENDPOINT}/api/create-offer?address=${collection}&id=${id}&duration=${duration}&borrowerAddress=${borrowerAddress}&principal=${principal}&apr=${apr}`
        let res = await axios.get(url, {headers: {'x-api-key': this.apiKey}})
        
        if (res['data']['success'] == true){
            


            let erc721_contract = new ethers.Contract( collection , ERC721_ABI , this.provider )

            let approved = await erc721_contract.isApprovedForAll(this.provider.address, this.nftfi)
            
            if (approved == false){
                console.log("Approving")
                await erc721_contract.setApprovalForAll(this.nftfi, true)
            }
            
            let nftfi_contract = new ethers.Contract( this.nftfi , NFTFI_ABI , this.provider )

            let loan = res['data']['body']
            let loan_details = loan['result']['terms']['loan']
            
            console.log(loan, loan_details)
            
            let offer = {loanPrincipalAmount: loan_details['principal'], maximumRepaymentAmount: loan_details['repayment'], nftCollateralId: loan['result']['nft']['id'], nftCollateralContract: loan['result']['nft']['address'], loanDuration: loan_details['duration'], loanAdminFeeInBasisPoints: loan['result']['nftfi']['fee']['bps'], loanERC20Denomination: loan_details['currency'], referrer: loan['result']['referrer']['address']}
            let BorrowerSettings = {revenueSharePartner: loan['result']['referrer']['address'], referralFeeInBasisPoints: 0} //will likely be modified
            let signature = {nonce: loan['result']['lender']['nonce'], expiry: loan_details['expiry'], signer: loan['result']['lender']['address'], signature: loan['result']['signature']}
            
            
            await nftfi_contract.acceptOffer(offer, signature, BorrowerSettings) //this will create the loans
        }
        else{
            throw new Error(res['data']['message'])
        }
    }
    
    

}