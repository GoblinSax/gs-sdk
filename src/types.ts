import { BigNumber } from "ethers";
import { Nftfi } from "types/typechain";

export type GS_API_CreateOfferResponse = {
  success: boolean;
  body: {
    result: {
      nft: {
        id: string;
        address: string;
      };
      lender: {
        address: string;
        nonce: string;
      };
      borrower: {
        address: string;
      };
      referrer: {
        address: string;
      };
      terms: {
        loan: {
          duration: number;
          repayment: string;
          principal: string;
          currency: string;
          expiry: number;
          interest: {
            prorated: boolean;
            bps: number;
          };
        };
      };
      nftfi: {
        contract: {
          name: string;
        };
        fee: {
          bps: string;
        };
      };
      id: string;
      signature: string;
      service_fee: {
        service_fee: BigNumber;
        fee_receiver: string;
        fee_receiver_nonce: string;
        signature_expiry: number;
        bnpl_contract: string;
        chain_id: number;
        signature: string;
      };
    };
  };
  reason?: string;
  message?: string;
};

export type GS_API_GetLoanTerms = {
  success: boolean;
  body: {
    maxLoan: number;
    price: number;
    offers: Record<string, { LTV: number; APR: number; FEE: number }[]>;
  };
  message?: string;
};

export type GS_API_Collections = {
  whitelist: {
    slug: string;
    asset_contract: string;
  }[];
};

export type AlchemyGetLoans = {
  ownedNfts: {
    contract: {
      address: string;
    };
    id: {
      tokenId: string;
    };
    title: string;
  }[];
};

export enum Version {
  MAINNET,
  RINKEBY,
  GOERLI,
}

export enum LoanType {
  NFTfi,
  BNPL,
}

export type GetLoansReturnType = Record<
  string,
  {
    loanType: LoanType;
    loanInfo: Awaited<ReturnType<Nftfi["loanIdToLoan"]>>;
  }
>;
