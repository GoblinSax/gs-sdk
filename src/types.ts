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
      signature: string;
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
    offers: Record<string, { LTV: number; APR: number }[]>;
  };
  message?: string;
};

export type GS_API_Collections = {
  slug: string;
  asset_contract: string;
}[];

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
