import axios from "axios";
import { BigNumber, ethers } from "ethers";

import NFTFI_ABI from "./abis/nftfi.json";
import ERC721_ABI from "./abis/erc721.json";
import ERC20_ABI from "./abis/erc20.json";
import NFTFI_NOTE_RECEIPT_ABI from "./abis/nftfiNoteReceipt.json";
import BNPL_ABI from "./abis/bnpl.json";
import SEAPORT_ABI from "./abis/seaport.json";

import {
  Nftfi,
  Erc20,
  Erc721,
  Bnpl,
  NftfiNoteReceipt,
} from "../types/typechain";

import {
  SeaportInterface,
  OfferItemStruct,
  ConsiderationItemStruct,
} from "../types/typechain/Seaport";

import {
  AlchemyGetLoans,
  GS_API_Collections,
  GS_API_CreateOfferResponse,
  GS_API_GetLoanTerms,
} from "src/types";

export enum Version {
  MAINNET,
  RINKEBY,
  GOERLI,
}

export enum LoanType {
  NFTfi,
  BNPL,
}

export class GoblinSaxAPI {
  envConfig: {
    gs_api: string;
    os_api: string;
    alchemy_api: string;
    nftfi: string;
    nftfi_promissory_note: string;
    nftfi_obligation_receipt: string;
    nftfi_loanContract: string;
    nftfi_loanCoordinator: string;
    weth: string;
    bnpl: string;
    os_module: string;
    whitelisted_collections: string;
  };

  signer: ethers.providers.JsonRpcSigner;
  apiKey: string;
  version: Version;
  nftfi_contract: Nftfi;
  nftfi_note: NftfiNoteReceipt;
  nftfi_obligation: NftfiNoteReceipt;
  weth_contract: Erc20;
  bnpl_contract: Bnpl;
  gs_lender: string;

  constructor(
    signer: ethers.providers.JsonRpcSigner,
    apiKey: string,
    version: Version
  ) {
    switch (version) {
      case Version.MAINNET:
        this.envConfig = {
          gs_api: "https://atuz4790j2.execute-api.us-east-1.amazonaws.com/prod",
          os_api: "https://api.opensea.io/v2/orders/goerli/seaport",
          alchemy_api: "https://eth-mainnet.alchemyapi.io",
          nftfi: "0x8252df1d8b29057d1afe3062bf5a64d503152bc8",
          nftfi_promissory_note: "0x5660e206496808f7b5cdb8c56a696a96ae5e9b23",
          nftfi_obligation_receipt:
            "0xe73ECe5988FfF33a012CEA8BB6Fd5B27679fC481",
          nftfi_loanContract: "",
          nftfi_loanCoordinator: "",
          weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          bnpl: "",
          os_module: "0x0000000000000000000000000000000000000001",
          whitelisted_collections: "https://api.goblinsax.xyz/collections/",
        };
        break;
      case Version.GOERLI:
        this.envConfig = {
          gs_api: "https://0em9k7cjm4.execute-api.us-east-1.amazonaws.com/prod",
          os_api: "https://testnets-api.opensea.io/v2/orders/goerli/seaport",
          alchemy_api: "https://eth-goerli.alchemyapi.io",
          nftfi: "0x77097f421CEb2454eB5F77898d25159ff3C7381d",
          nftfi_promissory_note: "0x88bffd4154ecf7545741bf6f3ec9f7e2e11602db",
          nftfi_obligation_receipt:
            "0x3a44cc29C019865Aa71C2352AbC5700403296D58",
          nftfi_loanContract: "0x77097f421CEb2454eB5F77898d25159ff3C7381d",
          nftfi_loanCoordinator: "0x97B55Db860CfB0E25F74d415aC23FA4dd1495C86",
          weth: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          bnpl: "0xFfA9e3bbC8F15E8B5AC005aE86083773853A8B75",
          os_module: "0xAa690b6137289357f516Dd92CE1Db4383f258cD3",
          whitelisted_collections:
            "https://api.goblinsax.xyz/collections_goerli/",
        };
        break;
      default:
        throw new Error(`Version must be one of ${Version}`);
    }

    this.signer = signer;
    this.apiKey = apiKey;
    this.version = version;
    this.gs_lender = "0xb66284947F9A35bD9FA893D444F19033FeBdA4A1";

    this.nftfi_contract = new ethers.Contract(
      this.envConfig.nftfi,
      NFTFI_ABI,
      this.signer
    ) as Nftfi;

    this.nftfi_note = new ethers.Contract(
      this.envConfig.nftfi_promissory_note,
      NFTFI_NOTE_RECEIPT_ABI,
      this.signer
    ) as NftfiNoteReceipt;

    this.nftfi_obligation = new ethers.Contract(
      this.envConfig.nftfi_obligation_receipt,
      NFTFI_NOTE_RECEIPT_ABI,
      this.signer
    ) as NftfiNoteReceipt;

    this.weth_contract = new ethers.Contract(
      this.envConfig.weth,
      ERC20_ABI,
      this.signer
    ) as Erc20;

    this.bnpl_contract = new ethers.Contract(
      this.envConfig.bnpl,
      BNPL_ABI,
      this.signer
    ) as Bnpl;
  }

  async getWhitelist(): Promise<GS_API_Collections> {
    return (
      await axios.get<GS_API_Collections>(
        this.envConfig.whitelisted_collections
      )
    ).data;
  }

  async getTerms(
    collection: string,
    assetId: string
  ): Promise<GS_API_GetLoanTerms["body"]> {
    let res = await axios.get(
      `${this.envConfig.gs_api}/api/get-loan-terms?address=${collection}&id=${assetId}`,
      { headers: { "x-api-key": this.apiKey } }
    );

    if (res.data.success) {
      return res.data.body;
    } else {
      throw new Error(res.data.reason);
    }
  }

  async repayLoan(loanId: ethers.BigNumberish) {
    this.nftfi_contract.payBackLoan(loanId);
  }

  async getLoans(alchemyApiKey: string) {
    const signerAddress = await this.signer.getAddress();
    let fetchMorePromissoryNotes = true;
    let gsPromissoryNotesAssets: AlchemyGetLoans["ownedNfts"] = [];
    let fetchObligationReceipts = true;
    let signerObligationReceiptAssets: AlchemyGetLoans["ownedNfts"] = [];

    // Fetch Promissory notes (Traditional loan from NFTfi)
    // In this case GS Lender owns the notes
    while (fetchMorePromissoryNotes) {
      const url = `${this.envConfig.alchemy_api}/nft/v2/${alchemyApiKey}/getNFTs/?owner=${this.gs_lender}&contractAddresses[]=${this.envConfig.nftfi_promissory_note}`;
      const res = await axios.get<AlchemyGetLoans>(url);
      gsPromissoryNotesAssets = [
        ...gsPromissoryNotesAssets,
        ...res.data.ownedNfts,
      ];
      if (!res.data["pageKey"]) {
        fetchMorePromissoryNotes = false;
      }
    }

    // Fetch Obligation notes (BNPL loans)
    // In this case the Borrower get the obligation note and lender is address 0
    while (fetchObligationReceipts) {
      const url = `${this.envConfig.alchemy_api}/nft/v2/${alchemyApiKey}/getNFTs/?owner=${signerAddress}&contractAddresses[]=${this.envConfig.nftfi_obligation_receipt}`;
      const res = await axios.get<AlchemyGetLoans>(url);
      signerObligationReceiptAssets = [
        ...signerObligationReceiptAssets,
        ...res.data.ownedNfts,
      ];
      if (!res.data["pageKey"]) {
        fetchObligationReceipts = false;
      }
    }

    const all_loans: Record<
      string,
      {
        loanType: LoanType;
        loanInfo: Awaited<ReturnType<Nftfi["loanIdToLoan"]>>;
      }
    > = {};

    // Process notes and obligations
    for (let asset of gsPromissoryNotesAssets) {
      // get loan id
      const promissoryNoteTokenId = asset.id.tokenId;
      const loanId = (await this.nftfi_note.loans(promissoryNoteTokenId))
        .loanId;

      // get loan info
      const loanInfo = await this.nftfi_contract.loanIdToLoan(loanId);

      // NFTfi loan: GS has promissory note and borrower is signer
      if (loanInfo.borrower.toLowerCase() == signerAddress.toLowerCase()) {
        all_loans[loanId.toString()] = {
          loanType: LoanType.NFTfi,
          loanInfo,
        };
      }

      // BNPL loan: borrower is zero address and
      // signer has an obligation note with id equal to promissoryNoteTokenId
      if (
        loanInfo.borrower == ethers.constants.AddressZero &&
        signerObligationReceiptAssets.find(
          (a) => a.id.tokenId == promissoryNoteTokenId
        )
      ) {
        all_loans[loanId.toString()] = {
          loanType: LoanType.BNPL,
          loanInfo,
        };
      }
    }

    return all_loans;
  }

  async checkApprovedWETH() {
    const address = await this.signer.getAddress();
    let x = await this.weth_contract.allowance(address, this.envConfig.nftfi);

    //compare with a very large amount whose size is unlikely in a single loan
    if (x.lt(BigNumber.from(10).pow(18).mul(1000))) {
      return false;
    } else {
      return true;
    }
  }

  async approveSpendingWETH() {
    await this.weth_contract.approve(
      this.envConfig.nftfi,
      ethers.constants.MaxUint256
    );
  }

  async checkApprovedNFT(collection) {
    try {
      let erc721_contract = new ethers.Contract(
        collection,
        ERC721_ABI,
        this.signer
      ) as Erc721;
      const signerAddress = await this.signer.getAddress();
      return await erc721_contract.isApprovedForAll(
        signerAddress,
        this.envConfig.nftfi
      );
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
    await erc721_contract.setApprovalForAll(this.envConfig.nftfi, true);
  }

  async createOffer(
    collection: string,
    assetId: string,
    duration: string,
    borrowerAddress: string,
    principal: ethers.BigNumberish,
    apr: number
  ) {
    let url = `${this.envConfig.gs_api}/api/create-offer?address=${collection}&id=${assetId}&duration=${duration}&borrowerAddress=${borrowerAddress}&principal=${principal}&apr=${apr}`;
    let res = await axios.get<GS_API_CreateOfferResponse>(url, {
      headers: { "x-api-key": this.apiKey },
    });

    if (!res.data.success) {
      throw new Error(res.data.reason);
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
    const osApiUrl = `${this.envConfig.os_api}/listings?asset_contract_address=${collection}&token_ids=${assetId}&limit=1`;
    let osRes = await axios.get(osApiUrl);
    let listing = osRes.data.orders[0];

    if (!listing) {
      throw new Error("Listing not found for asset provided");
    }

    return listing;
  }

  async bnplAllowance(
    token: string,
    marketPrice: string,
    principal: string,
    gsFee: string
  ) {
    const contract = new ethers.Contract(
      token,
      ERC20_ABI,
      this.signer
    ) as Erc20;
    const address = this.signer.getAddress();
    const allowance = await contract.allowance(address, this.envConfig.bnpl);
    const requiredAllowance = BigNumber.from(marketPrice)
      .sub(principal)
      .sub(gsFee);
    return {
      isAllowanceRequired: requiredAllowance.gt(allowance),
      approve: () => contract.approve(this.envConfig.bnpl, requiredAllowance),
    };
  }

  async bnplOS(
    collection: string,
    assetId: string,
    duration: string,
    borrowerAddress: string,
    principal: string,
    apr: number
  ) {
    let iface = new ethers.utils.Interface(SEAPORT_ABI) as SeaportInterface;

    const listing = await this.getOSListing(collection, assetId);
    const osOffer = listing.protocol_data.parameters.offer[0];

    let gsOffer;
    try {
      gsOffer = await this.createOffer(
        collection,
        assetId,
        duration,
        borrowerAddress,
        principal,
        apr
      );
    } catch (error) {
      console.error("GS Create offer: ", error);
    }

    if (listing.protocol_data.parameters.offer.length > 1) {
      throw Error("Opensea offer length not supported.");
    }

    const fulfillBasicOrderData = () =>
      iface.encodeFunctionData("fulfillBasicOrder", [
        {
          considerationToken: osOffer.token, // considerationToken
          considerationIdentifier: 0, // considerationIdentifier
          considerationAmount: osOffer.startAmount, // considerationAmount
          offerer: listing.protocol_data.parameters.offerer, // offerer
          zone: listing.protocol_data.parameters.zone, // zone
          offerToken: osOffer.token, // offerToken
          offerIdentifier: osOffer.identifierOrCriteria, // offerIdentifier
          offerAmount: 1, // offerAmount
          basicOrderType: 8, // basicOrderType - ERC721 paying with ERC20
          startTime: listing.protocol_data.parameters.startTime, // startTime
          endTime: listing.protocol_data.parameters.endTime, // endTime
          zoneHash: listing.protocol_data.parameters.zoneHash, // zoneHash
          salt: listing.protocol_data.parameters.salt, // salt
          offererConduitKey: listing.protocol_data.parameters.conduitKey, // offererConduitKey
          fulfillerConduitKey:
            "0x0000000000000000000000000000000000000000000000000000000000000000", // fulfillerConduitKey
          totalOriginalAdditionalRecipients:
            listing.protocol_data.parameters.consideration.length - 1, // totalOriginalAdditionalRecipients
          additionalRecipients: listing.protocol_data.parameters.consideration
            .slice(1)
            .map((c) => ({ amount: c.startAmount, recipient: c.recipient })), // AdditionalRecipient[]
          signature: listing.protocol_data.signature, // signature
        },
      ]);

    const fulfillAdvancedOrder = () =>
      iface.encodeFunctionData("fulfillAdvancedOrder", [
        {
          parameters: {
            offerer: listing.protocol_data.parameters.offerer,
            zone: listing.protocol_data.parameters.zone,
            offer: listing.protocol_data.parameters.offer as OfferItemStruct[],
            consideration: listing.protocol_data.parameters
              .consideration as ConsiderationItemStruct[],
            orderType: listing.protocol_data.parameters.orderType,
            startTime: listing.protocol_data.parameters.startTime,
            endTime: listing.protocol_data.parameters.endTime,
            zoneHash: listing.protocol_data.parameters.zoneHash,
            salt: listing.protocol_data.parameters.salt,
            conduitKey: listing.protocol_data.parameters.conduitKey,
            totalOriginalConsiderationItems:
              listing.protocol_data.parameters.totalOriginalConsiderationItems,
          }, // OrderParameters
          numerator: 1,
          denominator: listing.protocol_data.parameters.offer.endAmount,
          signature: listing.protocol_data.signature,
          extraData: "0x",
        }, // advancedOrder
        [], // criteriaResolvers
        "0x", // fulfillerConduitKey
        ethers.constants.AddressZero, // recipient
      ]);

    return this.bnpl_contract.execute({
      module: this.envConfig.os_module,
      assetType:
        osOffer.itemType == 2
          ? ethers.utils.formatBytes32String("ERC721")
          : ethers.utils.formatBytes32String("ERC1155"),
      buyData:
        osOffer.startAmount == "1" && osOffer.endAmount == "1"
          ? fulfillBasicOrderData()
          : fulfillAdvancedOrder(),
      totalPrice: BigNumber.from(listing.current_price).div(
        BigNumber.from(osOffer.endAmount)
      ),
      loanContract: this.envConfig.nftfi_loanContract,
      loanCoordinator: this.envConfig.nftfi_loanCoordinator,
      serviceFeeData: {
        serviceFee: 0, // TODO: bring from API
        nonce: gsOffer.signature.nonce,
        expiry: gsOffer.signature.expiry,
        signature: gsOffer.signature.signature,
      },
      offer: {
        loanPrincipalAmount: gsOffer.offer.loanPrincipalAmount,
        maximumRepaymentAmount: gsOffer.offer.maximumRepaymentAmount,
        nftCollateralId: gsOffer.offer.nftCollateralId,
        nftCollateralContract: gsOffer.offer.nftCollateralContract,
        loanDuration: gsOffer.offer.loanDuration,
        loanAdminFeeInBasisPoints: gsOffer.offer.loanAdminFeeInBasisPoints,
        loanERC20Denomination: gsOffer.offer.loanERC20Denomination,
        referrer: gsOffer.offer.referrer,
      },
      lenderSignature: gsOffer.signature,
      borrowerSettings: {
        revenueSharePartner: ethers.constants.AddressZero, // TODO: check this
        referralFeeInBasisPoints: 0,
      },
    });
  }
}
