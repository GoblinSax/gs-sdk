import axios from "axios";
import { BigNumber, ethers } from "ethers";
import NFTFI_ABI from "./abis/nftfi.json";
import ERC721_ABI from "./abis/erc721.json";
import ERC20_ABI from "./abis/erc20.json";
import BNPL from "./abis/bnpl.json";
import { Nftfi, Erc20, Erc721, Bnpl } from "../types/typechain";

import {
  GS_API_Collections,
  GS_API_CreateOfferResponse,
  GS_API_GetLoanTerms,
} from "src/types";

export enum Version {
  MAINNET,
  RINKEBY,
  GOERLI,
}

export class GoblinSaxAPI {
  signer: ethers.providers.JsonRpcSigner;
  apiKey: string;
  version: Version;
  gs_api: string;
  os_api: string;
  note: string;
  nftfi: string;
  nftfi_contract: Nftfi;
  weth: string;
  weth_contract: Erc20;
  bnpl: string;
  bnpl_contract: Bnpl;
  os_module: string;

  constructor(
    signer: ethers.providers.JsonRpcSigner,
    apiKey: string,
    version: Version
  ) {
    this.signer = signer;
    this.apiKey = apiKey;
    this.version = version;

    switch (version) {
      case Version.MAINNET:
        {
          this.gs_api =
            "https://atuz4790j2.execute-api.us-east-1.amazonaws.com/prod";
          this.os_api = "https://api.opensea.io/v2/orders/goerli/seaport";

          this.nftfi = "0x8252df1d8b29057d1afe3062bf5a64d503152bc8";
          this.note = "0x5660e206496808f7b5cdb8c56a696a96ae5e9b23";
          this.weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
          this.bnpl = "";
          this.os_module = "0x0000000000000000000000000000000000000001";
        }
        break;
      case Version.GOERLI:
        {
          this.gs_api =
            "https://sdm6h8zgmd.execute-api.us-east-1.amazonaws.com/prod";
          this.os_api =
            "https://testnets-api.opensea.io/v2/orders/goerli/seaport";

          this.nftfi = "0x77097f421CEb2454eB5F77898d25159ff3C7381d";
          this.note = "0x88bffd4154ecf7545741bf6f3ec9f7e2e11602db";
          this.weth = "0x0bb7509324ce409f7bbc4b701f932eaca9736ab7";
          this.bnpl = "0xa261C830fc1632F433Ab628f315B9AdadBd91D28";
          this.os_module = "0x0000000000000000000000000000000000000001";
        }
        break;
      default:
        throw new Error(`Version must be one of ${Version}`);
    }

    this.nftfi_contract = new ethers.Contract(
      this.nftfi,
      NFTFI_ABI,
      this.signer
    ) as Nftfi;

    this.weth_contract = new ethers.Contract(
      this.weth,
      ERC20_ABI,
      this.signer
    ) as Erc20;

    this.bnpl_contract = new ethers.Contract(
      this.bnpl,
      BNPL,
      this.signer
    ) as Bnpl;
  }

  async getWhitelist(): Promise<GS_API_Collections> {
    switch (this.version) {
      case Version.GOERLI:
        return (
          await axios.get<GS_API_Collections>(
            "https://api.goblinsax.xyz/collections_goerli/"
          )
        ).data;
      default:
        return (
          await axios.get<GS_API_Collections>(
            "https://api.goblinsax.xyz/collections/"
          )
        ).data;
    }
  }

  async getTerms(
    collection: string,
    assetId: string
  ): Promise<GS_API_GetLoanTerms["body"]> {
    let res = await axios.get(
      `${this.gs_api}/api/get-loan-terms?address=${collection}&id=${assetId}`,
      { headers: { "x-api-key": this.apiKey } }
    );

    if (res.data.success) {
      return res.data.body;
    } else {
      throw new Error(res.data.message);
    }
  }

  async repayLoan(loanId: ethers.BigNumberish) {
    this.nftfi_contract.payBackLoan(loanId);
  }

  async getLoans(apiKey: string) {
    let baseURL;

    if (this.version == Version.GOERLI) {
      baseURL = `https://eth-goerli.alchemyapi.io`;
    } else if (this.version == Version.MAINNET) {
      baseURL = `https://eth-mainnet.alchemyapi.io`;
    }

    let url = `${baseURL}/nft/v2/${apiKey}/getNFTs/?owner=0xb66284947F9A35bD9FA893D444F19033FeBdA4A1&contractAddresses[]=${this.note}`;
    let response = await axios.get(url);

    let collections = response.data["ownedNfts"];

    let curr;

    while ("pageKey" in response.data) {
      url = `${baseURL}/nft/v2/${apiKey}/getNFTs/?owner=0xb66284947F9A35bD9FA893D444F19033FeBdA4A1&contractAddresses[]=${this.note}`;
      curr = await axios.get(url);
      collections.push(curr.data);
    }

    let all_loans = {};

    for (let collection of collections) {
      const id = collection["title"].split(" ")[2].replace("#", "");
      const loan = await this.nftfi_contract.loanIdToLoan(id);
      const signerAddress = await this.signer.getAddress();
      if (loan["borrower"].toLowerCase() == signerAddress.toLowerCase()) {
        all_loans[id] = loan;
      }
    }

    return all_loans;
  }

  async checkApprovedWETH() {
    const address = await this.signer.getAddress();
    let x = await this.weth_contract.allowance(address, this.nftfi);

    //compare with a very large amount whose size is unlikely in a single loan
    if (x.lt(BigNumber.from(10).pow(18).mul(1000))) {
      return false;
    } else {
      return true;
    }
  }

  async approveSpendingWETH() {
    await this.weth_contract.approve(this.nftfi, ethers.constants.MaxUint256);
  }

  async checkApprovedNFT(collection) {
    try {
      let erc721_contract = new ethers.Contract(
        collection,
        ERC721_ABI,
        this.signer
      ) as Erc721;
      const signerAddress = await this.signer.getAddress();
      return await erc721_contract.isApprovedForAll(signerAddress, this.nftfi);
    } catch (error) {
      return false;
    }
  }

  async approveSpendingNFT(collection) {
    let erc721_contract = new ethers.Contract(
      collection,
      ERC721_ABI,
      this.signer
    );
    await erc721_contract.setApprovalForAll(this.nftfi, true);
  }

  async createOffer(
    collection: string,
    assetId: string,
    duration: string,
    borrowerAddress: string,
    principal: ethers.BigNumberish,
    apr: number
  ) {
    let url = `${this.gs_api}/api/create-offer?address=${collection}&id=${assetId}&duration=${duration}&borrowerAddress=${borrowerAddress}&principal=${principal}&apr=${apr}`;
    let res = await axios.get<GS_API_CreateOfferResponse>(url, {
      headers: { "x-api-key": this.apiKey },
    });

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    const loan = res.data.body;
    const loanDetails = loan.result.terms.loan;

    return {
      offer: {
        loanPrincipalAmount: loanDetails.principal,
        maximumRepaymentAmount: loanDetails.repayment,
        nftCollateralId: loan.result.nft.id,
        nftCollateralContract: loan.result.nft.address,
        loanDuration: loanDetails.duration,
        loanAdminFeeInBasisPoints: loan.result.nftfi.fee.bps,
        loanERC20Denomination: loanDetails.currency,
        referrer: loan.result.referrer.address,
      },
      borrowerSettings: {
        revenueSharePartner: loan.result.referrer.address,
        referralFeeInBasisPoints: 0,
      },
      signature: {
        nonce: loan.result.lender.nonce,
        expiry: loanDetails.expiry,
        signer: loan.result.lender.address,
        signature: loan.result.signature,
      },
    };
  }

  async beginLoan(
    collection,
    assetId,
    duration,
    borrowerAddress,
    principal: string,
    apr,
    _referral // TODO: not used, should we remove it?
  ) {
    const { offer, signature, borrowerSettings } = await this.createOffer(
      collection,
      assetId,
      duration,
      borrowerAddress,
      principal,
      apr
    );

    await this.nftfi_contract.acceptOffer(offer, signature, borrowerSettings); //this will create the loan
  }

  async getOSListing(collection: string, assetId: string) {
    const osApiUrl = `${this.os_api}/listings?asset_contract_address=${collection}&token_ids=${assetId}&limit=1`;
    let osRes = await axios.get(osApiUrl);
    let listing = osRes.data.orders[0];

    if (!listing) {
      throw new Error("Listing not found for asset provided");
    }

    return listing;
  }

  async bnplOS(
    collection: string,
    assetId: string,
    duration: string,
    borrowerAddress: string,
    principal: string,
    apr: number
  ) {
    const listing = await this.getOSListing(collection, assetId);
    const offer = await this.createOffer(
      collection,
      assetId,
      duration,
      borrowerAddress,
      principal,
      apr
    );

    const osBuyData = ethers.utils.defaultAbiCoder.encode(
      [
        `tuple(
        address,
        uint256,
        uint256,
        address,
        address,
        address,
        uint256,
        uint256,
        uint8,
        uint256,
        uint256,
        bytes32,
        uint256,
        bytes32,
        bytes32,
        uint256,
        tuple(uint256 amount,address recipient)[],
        bytes
      )`,
      ],
      [
        [
          listing.protocol_data.parameters.consideration[0].token, // considerationToken
          0, // considerationIdentifier
          listing.protocol_data.parameters.consideration[0].startAmount, // considerationAmount
          listing.protocol_data.parameters.offerer, // offererN
          listing.protocol_data.parameters.zone, // zone
          listing.protocol_data.parameters.offer[0].token, // offerToken
          listing.protocol_data.parameters.offer[0].identifierOrCriteria, // offerIdentifier
          1, // offerAmount
          8, // basicOrderType - ERC721 paying with ERC20
          listing.protocol_data.parameters.startTime, // startTime
          listing.protocol_data.parameters.endTime, // endTime
          listing.protocol_data.parameters.zoneHash, // zoneHash
          listing.protocol_data.parameters.salt, // salt
          listing.protocol_data.parameters.conduitKey, // offererConduitKey
          "0x0000000000000000000000000000000000000000000000000000000000000000", // fulfillerConduitKey
          listing.protocol_data.parameters.consideration.length - 1, // totalOriginalAdditionalRecipients
          listing.protocol_data.parameters.consideration
            .slice(1)
            .map((c) => ({ amount: c.startAmount, recipient: c.recipient })), // AdditionalRecipient[]
          listing.protocol_data.signature, // signature
        ],
      ]
    );

    return this.bnpl_contract.execute({
      module: this.os_module,
      assetType: ethers.utils.formatBytes32String("ERC721"),
      buyData: osBuyData,
      totalPrice: listing["current_price"],
      loanContract: ethers.constants.AddressZero, // TODO: check this
      loanCoordinator: ethers.constants.AddressZero, // TODO: check this
      serviceFeeData: {
        serviceFee: 0, // TODO: bring from API
        nonce: offer.signature.nonce,
        expiry: offer.signature.expiry,
        signature: offer.signature.signature,
      },
      offer: {
        loanPrincipalAmount: offer.offer.loanPrincipalAmount,
        maximumRepaymentAmount: offer.offer.maximumRepaymentAmount,
        nftCollateralId: offer.offer.nftCollateralId,
        nftCollateralContract: offer.offer.nftCollateralContract,
        loanDuration: offer.offer.loanDuration,
        loanAdminFeeInBasisPoints: offer.offer.loanAdminFeeInBasisPoints,
        loanERC20Denomination: offer.offer.loanERC20Denomination,
        referrer: offer.offer.referrer,
      },
      lenderSignature: offer.signature,
      borrowerSettings: {
        revenueSharePartner: ethers.constants.AddressZero, // TODO: check this
        referralFeeInBasisPoints: 0,
      },
    });
  }
}
