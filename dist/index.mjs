// src/api.ts
import axios from "axios";
import { BigNumber, ethers } from "ethers";

// src/abis/nftfi.json
var nftfi_default = [
  {
    inputs: [
      { internalType: "address", name: "_admin", type: "address" },
      { internalType: "address", name: "_nftfiHub", type: "address" },
      {
        internalType: "address[]",
        name: "_permittedErc20s",
        type: "address[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "newAdminFee",
        type: "uint16"
      }
    ],
    name: "AdminFeeUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "erc20Contract",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPermitted",
        type: "bool"
      }
    ],
    name: "ERC20Permit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "loanId",
        type: "uint32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanPrincipalAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftCollateralId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanMaturityDate",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanLiquidationDate",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollateralContract",
        type: "address"
      }
    ],
    name: "LoanLiquidated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "loanId",
        type: "uint32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newLoanDuration",
        type: "uint32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaximumRepaymentAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "renegotiationFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "renegotiationAdminFee",
        type: "uint256"
      }
    ],
    name: "LoanRenegotiated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "loanId",
        type: "uint32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanPrincipalAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftCollateralId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaidToLender",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "adminFee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "revenueShare",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "revenueSharePartner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollateralContract",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "loanERC20Denomination",
        type: "address"
      }
    ],
    name: "LoanRepaid",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "loanId",
        type: "uint32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "loanPrincipalAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumRepaymentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "nftCollateralId",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "loanERC20Denomination",
            type: "address"
          },
          {
            internalType: "uint32",
            name: "loanDuration",
            type: "uint32"
          },
          {
            internalType: "uint16",
            name: "loanInterestRateForDurationInBasisPoints",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "loanAdminFeeInBasisPoints",
            type: "uint16"
          },
          {
            internalType: "address",
            name: "nftCollateralWrapper",
            type: "address"
          },
          {
            internalType: "uint64",
            name: "loanStartTime",
            type: "uint64"
          },
          {
            internalType: "address",
            name: "nftCollateralContract",
            type: "address"
          },
          { internalType: "address", name: "borrower", type: "address" }
        ],
        indexed: false,
        internalType: "struct LoanData.LoanTerms",
        name: "loanTerms",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "revenueSharePartner",
            type: "address"
          },
          {
            internalType: "uint16",
            name: "revenueShareInBasisPoints",
            type: "uint16"
          },
          {
            internalType: "uint16",
            name: "referralFeeInBasisPoints",
            type: "uint16"
          }
        ],
        indexed: false,
        internalType: "struct LoanData.LoanExtras",
        name: "loanExtras",
        type: "tuple"
      }
    ],
    name: "LoanStarted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaximumLoanDuration",
        type: "uint256"
      }
    ],
    name: "MaximumLoanDurationUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    inputs: [],
    name: "HUNDRED_PERCENT",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "LOAN_COORDINATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "LOAN_TYPE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "loanPrincipalAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumRepaymentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "nftCollateralId",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "nftCollateralContract",
            type: "address"
          },
          {
            internalType: "uint32",
            name: "loanDuration",
            type: "uint32"
          },
          {
            internalType: "uint16",
            name: "loanAdminFeeInBasisPoints",
            type: "uint16"
          },
          {
            internalType: "address",
            name: "loanERC20Denomination",
            type: "address"
          },
          { internalType: "address", name: "referrer", type: "address" }
        ],
        internalType: "struct LoanData.Offer",
        name: "_offer",
        type: "tuple"
      },
      {
        components: [
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
          { internalType: "address", name: "signer", type: "address" },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct LoanData.Signature",
        name: "_signature",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "revenueSharePartner",
            type: "address"
          },
          {
            internalType: "uint16",
            name: "referralFeeInBasisPoints",
            type: "uint16"
          }
        ],
        internalType: "struct LoanData.BorrowerSettings",
        name: "_borrowerSettings",
        type: "tuple"
      }
    ],
    name: "acceptOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "adminFeeInBasisPoints",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_nonce", type: "uint256" }
    ],
    name: "cancelLoanCommitmentBeforeLoanHasBegun",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" }
    ],
    name: "drainERC1155Airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "address", name: "_receiver", type: "address" }
    ],
    name: "drainERC20Airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" }
    ],
    name: "drainERC721Airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_erc20", type: "address" }
    ],
    name: "getERC20Permit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" }
    ],
    name: "getPayoffAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "_nonce", type: "uint256" }
    ],
    name: "getWhetherNonceHasBeenUsedForUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "hub",
    outputs: [
      { internalType: "contract INftfiHub", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" }
    ],
    name: "liquidateOverdueLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    name: "loanIdToLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "loanPrincipalAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maximumRepaymentAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nftCollateralId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "loanERC20Denomination",
        type: "address"
      },
      { internalType: "uint32", name: "loanDuration", type: "uint32" },
      {
        internalType: "uint16",
        name: "loanInterestRateForDurationInBasisPoints",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "loanAdminFeeInBasisPoints",
        type: "uint16"
      },
      {
        internalType: "address",
        name: "nftCollateralWrapper",
        type: "address"
      },
      { internalType: "uint64", name: "loanStartTime", type: "uint64" },
      {
        internalType: "address",
        name: "nftCollateralContract",
        type: "address"
      },
      { internalType: "address", name: "borrower", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    name: "loanIdToLoanExtras",
    outputs: [
      {
        internalType: "address",
        name: "revenueSharePartner",
        type: "address"
      },
      {
        internalType: "uint16",
        name: "revenueShareInBasisPoints",
        type: "uint16"
      },
      {
        internalType: "uint16",
        name: "referralFeeInBasisPoints",
        type: "uint16"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    name: "loanRepaidOrLiquidated",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maximumLoanDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" }
    ],
    name: "mintObligationReceipt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" }
    ],
    name: "payBackLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" },
      { internalType: "address", name: "_target", type: "address" },
      { internalType: "bytes", name: "_data", type: "bytes" },
      { internalType: "address", name: "_nftAirdrop", type: "address" },
      { internalType: "uint256", name: "_nftAirdropId", type: "uint256" },
      { internalType: "bool", name: "_is1155", type: "bool" },
      {
        internalType: "uint256",
        name: "_nftAirdropAmount",
        type: "uint256"
      }
    ],
    name: "pullAirdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" },
      {
        internalType: "uint32",
        name: "_newLoanDuration",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "_newMaximumRepaymentAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_renegotiationFee",
        type: "uint256"
      },
      { internalType: "uint256", name: "_lenderNonce", type: "uint256" },
      { internalType: "uint256", name: "_expiry", type: "uint256" },
      { internalType: "bytes", name: "_lenderSignature", type: "bytes" }
    ],
    name: "renegotiateLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_erc20", type: "address" },
      { internalType: "bool", name: "_permit", type: "bool" }
    ],
    name: "setERC20Permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "_erc20s", type: "address[]" },
      { internalType: "bool[]", name: "_permits", type: "bool[]" }
    ],
    name: "setERC20Permits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes4", name: "_interfaceId", type: "bytes4" }
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_newOwner", type: "address" }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_newAdminFeeInBasisPoints",
        type: "uint16"
      }
    ],
    name: "updateAdminFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMaximumLoanDuration",
        type: "uint256"
      }
    ],
    name: "updateMaximumLoanDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "_loanId", type: "uint32" }
    ],
    name: "wrapCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/erc721.json
var erc721_default = [
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "bytes4", name: "interfaceId", type: "bytes4" }
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

// src/abis/erc20.json
var erc20_default = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  }
];

// src/abis/nftfiNoteReceipt.json
var nftfiNoteReceipt_default = [
  {
    inputs: [
      { internalType: "address", name: "_admin", type: "address" },
      { internalType: "address", name: "_nftfiHub", type: "address" },
      {
        internalType: "address",
        name: "_loanCoordinator",
        type: "address"
      },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "string", name: "_customBaseURI", type: "string" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "BASE_URI_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "LOAN_COORDINATOR_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" }
    ],
    name: "exists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" }
    ],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "hub",
    outputs: [
      { internalType: "contract INftfiHub", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "loans",
    outputs: [
      {
        internalType: "address",
        name: "loanCoordinator",
        type: "address"
      },
      { internalType: "uint256", name: "loanId", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_customBaseURI", type: "string" }
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" }
    ],
    name: "setLoanCoordinator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes4", name: "_interfaceId", type: "bytes4" }
    ],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/bnpl.json
var bnpl_default = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeReceiver",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "Bnpl__execute_invalidAssetType",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__execute_invalidLoanPrincipalAmount",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__execute_invalidModule",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__execute_unsuccessfulBuy",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__setFeeReceiver_invalidAddress",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__setLoanCapBps_invalidLoanCapBps",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__setModuleAllowance_invalidAddress",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__validateServiceFee_expired",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__validateServiceFee_invalidNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__validateServiceFee_invalidSignature",
    type: "error"
  },
  {
    inputs: [],
    name: "Bnpl__validateServiceFee_invalidSigner",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "obligationReceipt",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "smartNftId",
        type: "uint256"
      }
    ],
    name: "BnplExecuted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allowed",
        type: "bool"
      }
    ],
    name: "ModuleAllowance",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferStarted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "SetAllowedMarketModules",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "feeReceiver",
        type: "address"
      }
    ],
    name: "SetFeeReceiver",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanCap",
        type: "uint256"
      }
    ],
    name: "SetLoanCap",
    type: "event"
  },
  {
    inputs: [],
    name: "ASSET_TYPE_ERC1155",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ASSET_TYPE_ERC721",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "HUNDRED_PERCENT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes32",
            name: "assetType",
            type: "bytes32"
          },
          {
            internalType: "bytes",
            name: "buyData",
            type: "bytes"
          },
          {
            internalType: "uint256",
            name: "totalPrice",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "loanContract",
            type: "address"
          },
          {
            internalType: "address",
            name: "loanCoordinator",
            type: "address"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "expiry",
                type: "uint256"
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
              }
            ],
            internalType: "struct Bnpl.ServiceFee",
            name: "serviceFeeData",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "loanPrincipalAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maximumRepaymentAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "nftCollateralId",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "nftCollateralContract",
                type: "address"
              },
              {
                internalType: "uint32",
                name: "loanDuration",
                type: "uint32"
              },
              {
                internalType: "uint16",
                name: "loanAdminFeeInBasisPoints",
                type: "uint16"
              },
              {
                internalType: "address",
                name: "loanERC20Denomination",
                type: "address"
              },
              {
                internalType: "address",
                name: "referrer",
                type: "address"
              }
            ],
            internalType: "struct Offer",
            name: "offer",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "expiry",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "signer",
                type: "address"
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
              }
            ],
            internalType: "struct Signature",
            name: "lenderSignature",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "revenueSharePartner",
                type: "address"
              },
              {
                internalType: "uint16",
                name: "referralFeeInBasisPoints",
                type: "uint16"
              }
            ],
            internalType: "struct BorrowerSettings",
            name: "borrowerSettings",
            type: "tuple"
          }
        ],
        internalType: "struct Bnpl.Execution",
        name: "_params",
        type: "tuple"
      }
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "feeReceiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getChainID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256"
      }
    ],
    name: "getLoanCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "invalidateNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "isModuleAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_lender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "isValidNonce",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "loanCapBps",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeReceiver",
        type: "address"
      }
    ],
    name: "setFeeReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_loanCapBps",
        type: "uint256"
      }
    ],
    name: "setLoanCapBps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_module",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_allowed",
        type: "bool"
      }
    ],
    name: "setModuleAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/seaport.json
var seaport_default = [
  {
    inputs: [
      {
        internalType: "address",
        name: "conduitController",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [], name: "BadContractSignature", type: "error" },
  { inputs: [], name: "BadFraction", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "BadReturnValueFromERC20OnTransfer",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint8", name: "v", type: "uint8" }],
    name: "BadSignatureV",
    type: "error"
  },
  {
    inputs: [],
    name: "ConsiderationCriteriaResolverOutOfRange",
    type: "error"
  },
  {
    inputs: [
      { internalType: "uint256", name: "orderIndex", type: "uint256" },
      {
        internalType: "uint256",
        name: "considerationIndex",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "shortfallAmount",
        type: "uint256"
      }
    ],
    name: "ConsiderationNotMet",
    type: "error"
  },
  { inputs: [], name: "CriteriaNotEnabledForItem", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      {
        internalType: "uint256[]",
        name: "identifiers",
        type: "uint256[]"
      },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" }
    ],
    name: "ERC1155BatchTransferGenericFailure",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "EtherTransferGenericFailure",
    type: "error"
  },
  { inputs: [], name: "InexactFraction", type: "error" },
  { inputs: [], name: "InsufficientEtherSupplied", type: "error" },
  { inputs: [], name: "Invalid1155BatchTransferEncoding", type: "error" },
  {
    inputs: [],
    name: "InvalidBasicOrderParameterEncoding",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "conduit", type: "address" }
    ],
    name: "InvalidCallToConduit",
    type: "error"
  },
  { inputs: [], name: "InvalidCanceller", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
      { internalType: "address", name: "conduit", type: "address" }
    ],
    name: "InvalidConduit",
    type: "error"
  },
  { inputs: [], name: "InvalidERC721TransferAmount", type: "error" },
  { inputs: [], name: "InvalidFulfillmentComponentData", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "InvalidMsgValue",
    type: "error"
  },
  { inputs: [], name: "InvalidNativeOfferItem", type: "error" },
  { inputs: [], name: "InvalidProof", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    name: "InvalidRestrictedOrder",
    type: "error"
  },
  { inputs: [], name: "InvalidSignature", type: "error" },
  { inputs: [], name: "InvalidSigner", type: "error" },
  { inputs: [], name: "InvalidTime", type: "error" },
  {
    inputs: [],
    name: "MismatchedFulfillmentOfferAndConsiderationComponents",
    type: "error"
  },
  {
    inputs: [
      { internalType: "enum Side", name: "side", type: "uint8" }
    ],
    name: "MissingFulfillmentComponentOnAggregation",
    type: "error"
  },
  { inputs: [], name: "MissingItemAmount", type: "error" },
  {
    inputs: [],
    name: "MissingOriginalConsiderationItems",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "NoContract",
    type: "error"
  },
  { inputs: [], name: "NoReentrantCalls", type: "error" },
  { inputs: [], name: "NoSpecifiedOrdersAvailable", type: "error" },
  {
    inputs: [],
    name: "OfferAndConsiderationRequiredOnFulfillment",
    type: "error"
  },
  { inputs: [], name: "OfferCriteriaResolverOutOfRange", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    name: "OrderAlreadyFilled",
    type: "error"
  },
  { inputs: [], name: "OrderCriteriaResolverOutOfRange", type: "error" },
  {
    inputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    name: "OrderIsCancelled",
    type: "error"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    name: "OrderPartiallyFilled",
    type: "error"
  },
  { inputs: [], name: "PartialFillsNotEnabledForOrder", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "identifier", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "TokenTransferGenericFailure",
    type: "error"
  },
  { inputs: [], name: "UnresolvedConsiderationCriteria", type: "error" },
  { inputs: [], name: "UnresolvedOfferCriteria", type: "error" },
  { inputs: [], name: "UnusedItemParameters", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCounter",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address"
      }
    ],
    name: "CounterIncremented",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "zone",
        type: "address"
      }
    ],
    name: "OrderCancelled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "zone",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        components: [
          {
            internalType: "enum ItemType",
            name: "itemType",
            type: "uint8"
          },
          { internalType: "address", name: "token", type: "address" },
          {
            internalType: "uint256",
            name: "identifier",
            type: "uint256"
          },
          { internalType: "uint256", name: "amount", type: "uint256" }
        ],
        indexed: false,
        internalType: "struct SpentItem[]",
        name: "offer",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "enum ItemType",
            name: "itemType",
            type: "uint8"
          },
          { internalType: "address", name: "token", type: "address" },
          {
            internalType: "uint256",
            name: "identifier",
            type: "uint256"
          },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "address payable",
            name: "recipient",
            type: "address"
          }
        ],
        indexed: false,
        internalType: "struct ReceivedItem[]",
        name: "consideration",
        type: "tuple[]"
      }
    ],
    name: "OrderFulfilled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "offerer",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "zone",
        type: "address"
      }
    ],
    name: "OrderValidated",
    type: "event"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "address", name: "zone", type: "address" },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "startAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endAmount",
                type: "uint256"
              }
            ],
            internalType: "struct OfferItem[]",
            name: "offer",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "startAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endAmount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ConsiderationItem[]",
            name: "consideration",
            type: "tuple[]"
          },
          {
            internalType: "enum OrderType",
            name: "orderType",
            type: "uint8"
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          {
            internalType: "bytes32",
            name: "conduitKey",
            type: "bytes32"
          },
          { internalType: "uint256", name: "counter", type: "uint256" }
        ],
        internalType: "struct OrderComponents[]",
        name: "orders",
        type: "tuple[]"
      }
    ],
    name: "cancel",
    outputs: [
      { internalType: "bool", name: "cancelled", type: "bool" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          {
            internalType: "uint120",
            name: "denominator",
            type: "uint120"
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct AdvancedOrder",
        name: "advancedOrder",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          {
            internalType: "uint256",
            name: "identifier",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]"
          }
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]"
      },
      {
        internalType: "bytes32",
        name: "fulfillerConduitKey",
        type: "bytes32"
      },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "fulfillAdvancedOrder",
    outputs: [
      { internalType: "bool", name: "fulfilled", type: "bool" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          {
            internalType: "uint120",
            name: "denominator",
            type: "uint120"
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct AdvancedOrder[]",
        name: "advancedOrders",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          {
            internalType: "uint256",
            name: "identifier",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]"
          }
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "uint256", name: "itemIndex", type: "uint256" }
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "offerFulfillments",
        type: "tuple[][]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "uint256", name: "itemIndex", type: "uint256" }
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "considerationFulfillments",
        type: "tuple[][]"
      },
      {
        internalType: "bytes32",
        name: "fulfillerConduitKey",
        type: "bytes32"
      },
      { internalType: "address", name: "recipient", type: "address" },
      {
        internalType: "uint256",
        name: "maximumFulfilled",
        type: "uint256"
      }
    ],
    name: "fulfillAvailableAdvancedOrders",
    outputs: [
      { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple"
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" }
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "uint256", name: "itemIndex", type: "uint256" }
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "offerFulfillments",
        type: "tuple[][]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "uint256", name: "itemIndex", type: "uint256" }
        ],
        internalType: "struct FulfillmentComponent[][]",
        name: "considerationFulfillments",
        type: "tuple[][]"
      },
      {
        internalType: "bytes32",
        name: "fulfillerConduitKey",
        type: "bytes32"
      },
      {
        internalType: "uint256",
        name: "maximumFulfilled",
        type: "uint256"
      }
    ],
    name: "fulfillAvailableOrders",
    outputs: [
      { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple"
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" }
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "considerationToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "considerationIdentifier",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "considerationAmount",
            type: "uint256"
          },
          {
            internalType: "address payable",
            name: "offerer",
            type: "address"
          },
          { internalType: "address", name: "zone", type: "address" },
          {
            internalType: "address",
            name: "offerToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "offerIdentifier",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "offerAmount",
            type: "uint256"
          },
          {
            internalType: "enum BasicOrderType",
            name: "basicOrderType",
            type: "uint8"
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          {
            internalType: "bytes32",
            name: "offererConduitKey",
            type: "bytes32"
          },
          {
            internalType: "bytes32",
            name: "fulfillerConduitKey",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "totalOriginalAdditionalRecipients",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct AdditionalRecipient[]",
            name: "additionalRecipients",
            type: "tuple[]"
          },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct BasicOrderParameters",
        name: "parameters",
        type: "tuple"
      }
    ],
    name: "fulfillBasicOrder",
    outputs: [
      { internalType: "bool", name: "fulfilled", type: "bool" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct Order",
        name: "order",
        type: "tuple"
      },
      {
        internalType: "bytes32",
        name: "fulfillerConduitKey",
        type: "bytes32"
      }
    ],
    name: "fulfillOrder",
    outputs: [
      { internalType: "bool", name: "fulfilled", type: "bool" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "offerer", type: "address" }
    ],
    name: "getCounter",
    outputs: [
      { internalType: "uint256", name: "counter", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "address", name: "zone", type: "address" },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "startAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endAmount",
                type: "uint256"
              }
            ],
            internalType: "struct OfferItem[]",
            name: "offer",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifierOrCriteria",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "startAmount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endAmount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ConsiderationItem[]",
            name: "consideration",
            type: "tuple[]"
          },
          {
            internalType: "enum OrderType",
            name: "orderType",
            type: "uint8"
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "bytes32", name: "zoneHash", type: "bytes32" },
          { internalType: "uint256", name: "salt", type: "uint256" },
          {
            internalType: "bytes32",
            name: "conduitKey",
            type: "bytes32"
          },
          { internalType: "uint256", name: "counter", type: "uint256" }
        ],
        internalType: "struct OrderComponents",
        name: "order",
        type: "tuple"
      }
    ],
    name: "getOrderHash",
    outputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "orderHash", type: "bytes32" }
    ],
    name: "getOrderStatus",
    outputs: [
      { internalType: "bool", name: "isValidated", type: "bool" },
      { internalType: "bool", name: "isCancelled", type: "bool" },
      { internalType: "uint256", name: "totalFilled", type: "uint256" },
      { internalType: "uint256", name: "totalSize", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "incrementCounter",
    outputs: [
      { internalType: "uint256", name: "newCounter", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "information",
    outputs: [
      { internalType: "string", name: "version", type: "string" },
      {
        internalType: "bytes32",
        name: "domainSeparator",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "conduitController",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "uint120", name: "numerator", type: "uint120" },
          {
            internalType: "uint120",
            name: "denominator",
            type: "uint120"
          },
          { internalType: "bytes", name: "signature", type: "bytes" },
          { internalType: "bytes", name: "extraData", type: "bytes" }
        ],
        internalType: "struct AdvancedOrder[]",
        name: "advancedOrders",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "orderIndex",
            type: "uint256"
          },
          { internalType: "enum Side", name: "side", type: "uint8" },
          { internalType: "uint256", name: "index", type: "uint256" },
          {
            internalType: "uint256",
            name: "identifier",
            type: "uint256"
          },
          {
            internalType: "bytes32[]",
            name: "criteriaProof",
            type: "bytes32[]"
          }
        ],
        internalType: "struct CriteriaResolver[]",
        name: "criteriaResolvers",
        type: "tuple[]"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "itemIndex",
                type: "uint256"
              }
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "offerComponents",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "itemIndex",
                type: "uint256"
              }
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "considerationComponents",
            type: "tuple[]"
          }
        ],
        internalType: "struct Fulfillment[]",
        name: "fulfillments",
        type: "tuple[]"
      }
    ],
    name: "matchAdvancedOrders",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple"
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" }
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "itemIndex",
                type: "uint256"
              }
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "offerComponents",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "itemIndex",
                type: "uint256"
              }
            ],
            internalType: "struct FulfillmentComponent[]",
            name: "considerationComponents",
            type: "tuple[]"
          }
        ],
        internalType: "struct Fulfillment[]",
        name: "fulfillments",
        type: "tuple[]"
      }
    ],
    name: "matchOrders",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8"
              },
              { internalType: "address", name: "token", type: "address" },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct ReceivedItem",
            name: "item",
            type: "tuple"
          },
          { internalType: "address", name: "offerer", type: "address" },
          { internalType: "bytes32", name: "conduitKey", type: "bytes32" }
        ],
        internalType: "struct Execution[]",
        name: "executions",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      { internalType: "string", name: "contractName", type: "string" }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "offerer",
                type: "address"
              },
              { internalType: "address", name: "zone", type: "address" },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  }
                ],
                internalType: "struct OfferItem[]",
                name: "offer",
                type: "tuple[]"
              },
              {
                components: [
                  {
                    internalType: "enum ItemType",
                    name: "itemType",
                    type: "uint8"
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address"
                  },
                  {
                    internalType: "uint256",
                    name: "identifierOrCriteria",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "startAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "uint256",
                    name: "endAmount",
                    type: "uint256"
                  },
                  {
                    internalType: "address payable",
                    name: "recipient",
                    type: "address"
                  }
                ],
                internalType: "struct ConsiderationItem[]",
                name: "consideration",
                type: "tuple[]"
              },
              {
                internalType: "enum OrderType",
                name: "orderType",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "zoneHash",
                type: "bytes32"
              },
              { internalType: "uint256", name: "salt", type: "uint256" },
              {
                internalType: "bytes32",
                name: "conduitKey",
                type: "bytes32"
              },
              {
                internalType: "uint256",
                name: "totalOriginalConsiderationItems",
                type: "uint256"
              }
            ],
            internalType: "struct OrderParameters",
            name: "parameters",
            type: "tuple"
          },
          { internalType: "bytes", name: "signature", type: "bytes" }
        ],
        internalType: "struct Order[]",
        name: "orders",
        type: "tuple[]"
      }
    ],
    name: "validate",
    outputs: [
      { internalType: "bool", name: "validated", type: "bool" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/types.ts
var Version = /* @__PURE__ */ ((Version2) => {
  Version2["MAINNET"] = "mainnet";
  Version2["GOERLI"] = "goerli";
  return Version2;
})(Version || {});
var LoanType = /* @__PURE__ */ ((LoanType2) => {
  LoanType2[LoanType2["NFTfi"] = 0] = "NFTfi";
  LoanType2[LoanType2["BNPL"] = 1] = "BNPL";
  return LoanType2;
})(LoanType || {});

// src/api.ts
var GoblinSaxAPI = class {
  constructor(signer, apiKey, version) {
    switch (version) {
      case "mainnet" /* MAINNET */:
        this.envConfig = {
          gs_api: "https://api.goblinsax.xyz/collections",
          os_api: "https://api.opensea.io/v2/orders/goerli/seaport",
          alchemy_api: "https://eth-mainnet.alchemyapi.io",
          nftfi: "0x8252df1d8b29057d1afe3062bf5a64d503152bc8",
          nftfi_promissory_note: "0x5660e206496808f7b5cdb8c56a696a96ae5e9b23",
          nftfi_obligation_receipt: "0xe73ECe5988FfF33a012CEA8BB6Fd5B27679fC481",
          nftfi_loanContract: "",
          nftfi_loanCoordinator: "",
          weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          bnpl: "",
          os_module: "0x0000000000000000000000000000000000000001"
        };
        break;
      case "goerli" /* GOERLI */:
        this.envConfig = {
          gs_api: "https://goerli-api.goblinsax.xyz",
          os_api: "https://testnets-api.opensea.io/v2/orders/goerli/seaport",
          alchemy_api: "https://eth-goerli.alchemyapi.io",
          nftfi: "0x77097f421CEb2454eB5F77898d25159ff3C7381d",
          nftfi_promissory_note: "0x88bffd4154ecf7545741bf6f3ec9f7e2e11602db",
          nftfi_obligation_receipt: "0x3a44cc29C019865Aa71C2352AbC5700403296D58",
          nftfi_loanContract: "0x77097f421CEb2454eB5F77898d25159ff3C7381d",
          nftfi_loanCoordinator: "0x97B55Db860CfB0E25F74d415aC23FA4dd1495C86",
          weth: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          bnpl: "0x7F3Df4948A55eFa1421828dd346b2bb81A8c00F9",
          os_module: "0x37f381F0d024D1107eBBCAbD6280501B3bF88b8D"
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
      nftfi_default,
      this.signer
    );
    this.nftfi_note = new ethers.Contract(
      this.envConfig.nftfi_promissory_note,
      nftfiNoteReceipt_default,
      this.signer
    );
    this.nftfi_obligation = new ethers.Contract(
      this.envConfig.nftfi_obligation_receipt,
      nftfiNoteReceipt_default,
      this.signer
    );
    this.weth_contract = new ethers.Contract(
      this.envConfig.weth,
      erc20_default,
      this.signer
    );
    this.bnpl_contract = new ethers.Contract(
      this.envConfig.bnpl,
      bnpl_default,
      this.signer
    );
  }
  async getWhitelist() {
    return (await axios.get(
      `${this.envConfig.gs_api}/api/whitelist`
    )).data.whitelist;
  }
  async getTerms(collection, assetId) {
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
  async repayLoan(loanId) {
    this.nftfi_contract.payBackLoan(loanId);
  }
  async getLoans(alchemyApiKey) {
    const signerAddress = await this.signer.getAddress();
    let fetchMorePromissoryNotes = true;
    let gsPromissoryNotesAssets = [];
    let fetchObligationReceipts = true;
    let signerObligationReceiptAssets = [];
    while (fetchMorePromissoryNotes) {
      const url = `${this.envConfig.alchemy_api}/nft/v2/${alchemyApiKey}/getNFTs/?owner=${this.gs_lender}&contractAddresses[]=${this.envConfig.nftfi_promissory_note}`;
      const res = await axios.get(url);
      gsPromissoryNotesAssets = [
        ...gsPromissoryNotesAssets,
        ...res.data.ownedNfts
      ];
      if (!res.data["pageKey"]) {
        fetchMorePromissoryNotes = false;
      }
    }
    while (fetchObligationReceipts) {
      const url = `${this.envConfig.alchemy_api}/nft/v2/${alchemyApiKey}/getNFTs/?owner=${signerAddress}&contractAddresses[]=${this.envConfig.nftfi_obligation_receipt}`;
      const res = await axios.get(url);
      signerObligationReceiptAssets = [
        ...signerObligationReceiptAssets,
        ...res.data.ownedNfts
      ];
      if (!res.data["pageKey"]) {
        fetchObligationReceipts = false;
      }
    }
    const all_loans = {};
    for (let asset of gsPromissoryNotesAssets) {
      const promissoryNoteTokenId = asset.id.tokenId;
      const loanId = (await this.nftfi_note.loans(promissoryNoteTokenId)).loanId;
      const loanInfo = await this.nftfi_contract.loanIdToLoan(loanId);
      if (loanInfo.borrower.toLowerCase() == signerAddress.toLowerCase()) {
        all_loans[loanId.toString()] = {
          loanType: 0 /* NFTfi */,
          loanInfo
        };
      }
      if (loanInfo.borrower == ethers.constants.AddressZero && signerObligationReceiptAssets.find(
        (a) => a.id.tokenId == promissoryNoteTokenId
      )) {
        all_loans[loanId.toString()] = {
          loanType: 1 /* BNPL */,
          loanInfo
        };
      }
    }
    return all_loans;
  }
  async checkApprovedWETH() {
    const address = await this.signer.getAddress();
    let x = await this.weth_contract.allowance(address, this.envConfig.nftfi);
    if (x.lt(BigNumber.from(10).pow(18).mul(1e3))) {
      return false;
    } else {
      return true;
    }
  }
  async approveSpendingWETH() {
    return this.weth_contract.approve(
      this.envConfig.nftfi,
      ethers.constants.MaxUint256
    );
  }
  async checkApprovedNFT(collection) {
    try {
      let erc721_contract = new ethers.Contract(
        collection,
        erc721_default,
        this.signer
      );
      const signerAddress = await this.signer.getAddress();
      return erc721_contract.isApprovedForAll(
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
      erc721_default,
      this.signer
    );
    return erc721_contract.setApprovalForAll(this.envConfig.nftfi, true);
  }
  async createOffer(collection, assetId, duration, borrowerAddress, principal, apr) {
    let url = `${this.envConfig.gs_api}/api/create-offer?address=${collection}&id=${assetId}&duration=${duration}&borrowerAddress=${borrowerAddress}&principal=${principal}&apr=${apr}`;
    let res = await axios.get(url, {
      headers: { "x-api-key": this.apiKey }
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
        referrer: loan.result.referrer.address
      },
      borrowerSettings: {
        revenueSharePartner: loan.result.referrer.address,
        referralFeeInBasisPoints: 0
      },
      signature: {
        nonce: loan.result.lender.nonce,
        expiry: loanDetails.expiry,
        signer: loan.result.lender.address,
        signature: loan.result.signature
      },
      serviceFee: {
        fee: BigNumber.from(loan.result.service_fee.service_fee.toString()),
        feeReceiver: loan.result.service_fee.fee_receiver,
        feeReceiverNonce: loan.result.service_fee.fee_receiver_nonce,
        signatureExpiry: loan.result.service_fee.signature_expiry,
        bnplContract: loan.result.service_fee.bnpl_contract,
        chainId: loan.result.service_fee.chain_id,
        signature: loan.result.service_fee.signature
      }
    };
  }
  async beginLoan(collection, assetId, duration, borrowerAddress, principal, apr) {
    const { offer, signature, borrowerSettings } = await this.createOffer(
      collection,
      assetId,
      duration,
      borrowerAddress,
      principal,
      apr
    );
    return this.nftfi_contract.acceptOffer(offer, signature, borrowerSettings);
  }
  async getOSListing(collection, assetId) {
    const osApiUrl = `${this.envConfig.os_api}/listings?asset_contract_address=${collection}&token_ids=${assetId}&limit=1`;
    let osRes = await axios.get(osApiUrl);
    let listing = osRes.data.orders[0];
    if (!listing) {
      throw new Error("Listing not found for asset provided");
    }
    return listing;
  }
  async getBnplLoanCap(marketPrice) {
    return this.bnpl_contract.getLoanCap(marketPrice);
  }
  async bnplAllowance(token, marketPrice, principal, gsFee) {
    const contract = new ethers.Contract(
      token,
      erc20_default,
      this.signer
    );
    const address = await this.signer.getAddress();
    const allowance = await contract.allowance(address, this.envConfig.bnpl);
    const requiredAllowance = BigNumber.from(marketPrice).sub(principal).add(gsFee);
    return {
      isAllowanceRequired: requiredAllowance.gt(allowance),
      approve: () => contract.approve(this.envConfig.bnpl, requiredAllowance)
    };
  }
  async bnplOS(collection, assetId, duration, borrowerAddress, principal, apr) {
    let iface = new ethers.utils.Interface(seaport_default);
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
    const fulfillAdvancedOrder = () => {
      const advancedOrder = {
        parameters: {
          offerer: listing.protocol_data.parameters.offerer,
          zone: listing.protocol_data.parameters.zone,
          offer: listing.protocol_data.parameters.offer,
          consideration: listing.protocol_data.parameters.consideration,
          orderType: listing.protocol_data.parameters.orderType,
          startTime: listing.protocol_data.parameters.startTime,
          endTime: listing.protocol_data.parameters.endTime,
          zoneHash: listing.protocol_data.parameters.zoneHash,
          salt: listing.protocol_data.parameters.salt,
          conduitKey: listing.protocol_data.parameters.conduitKey,
          totalOriginalConsiderationItems: listing.protocol_data.parameters.totalOriginalConsiderationItems
        },
        numerator: 1,
        denominator: listing.protocol_data.parameters.offer[0].endAmount,
        signature: listing.protocol_data.signature,
        extraData: ethers.constants.HashZero
      };
      try {
        return iface.encodeFunctionData("fulfillAdvancedOrder", [
          advancedOrder,
          [],
          ethers.constants.HashZero,
          ethers.constants.AddressZero
        ]);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    const executeParams = {
      module: this.envConfig.os_module,
      assetType: osOffer.itemType == 2 ? ethers.utils.formatBytes32String("ERC721") : ethers.utils.formatBytes32String("ERC1155"),
      buyData: fulfillAdvancedOrder(),
      totalPrice: BigNumber.from(listing.current_price).div(osOffer.endAmount),
      loanContract: this.envConfig.nftfi_loanContract,
      loanCoordinator: this.envConfig.nftfi_loanCoordinator,
      serviceFeeData: {
        amount: gsOffer.serviceFee.fee.toString(),
        nonce: gsOffer.serviceFee.feeReceiverNonce,
        expiry: gsOffer.serviceFee.signatureExpiry,
        signature: gsOffer.serviceFee.signature
      },
      offer: {
        loanPrincipalAmount: gsOffer.offer.loanPrincipalAmount,
        maximumRepaymentAmount: gsOffer.offer.maximumRepaymentAmount,
        nftCollateralId: gsOffer.offer.nftCollateralId,
        nftCollateralContract: gsOffer.offer.nftCollateralContract,
        loanDuration: gsOffer.offer.loanDuration,
        loanAdminFeeInBasisPoints: gsOffer.offer.loanAdminFeeInBasisPoints,
        loanERC20Denomination: gsOffer.offer.loanERC20Denomination,
        referrer: gsOffer.offer.referrer
      },
      lenderSignature: gsOffer.signature,
      borrowerSettings: {
        revenueSharePartner: ethers.constants.AddressZero,
        referralFeeInBasisPoints: 0
      }
    };
    return this.bnpl_contract.execute(executeParams);
  }
  async executeBnpl(collection, assetId, marketPrice, assetType, duration, borrowerAddress, principal, apr, buyData, module) {
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
    const executeParams = {
      module,
      assetType: ethers.utils.formatBytes32String(assetType),
      buyData,
      totalPrice: marketPrice,
      loanContract: this.envConfig.nftfi_loanContract,
      loanCoordinator: this.envConfig.nftfi_loanCoordinator,
      serviceFeeData: {
        amount: gsOffer.serviceFee.fee.toString(),
        nonce: gsOffer.serviceFee.feeReceiverNonce,
        expiry: gsOffer.serviceFee.signatureExpiry,
        signature: gsOffer.serviceFee.signature
      },
      offer: {
        loanPrincipalAmount: gsOffer.offer.loanPrincipalAmount,
        maximumRepaymentAmount: gsOffer.offer.maximumRepaymentAmount,
        nftCollateralId: gsOffer.offer.nftCollateralId,
        nftCollateralContract: gsOffer.offer.nftCollateralContract,
        loanDuration: gsOffer.offer.loanDuration,
        loanAdminFeeInBasisPoints: gsOffer.offer.loanAdminFeeInBasisPoints,
        loanERC20Denomination: gsOffer.offer.loanERC20Denomination,
        referrer: gsOffer.offer.referrer
      },
      lenderSignature: gsOffer.signature,
      borrowerSettings: {
        revenueSharePartner: ethers.constants.AddressZero,
        referralFeeInBasisPoints: 0
      }
    };
    return this.bnpl_contract.execute(executeParams);
  }
};
export {
  GoblinSaxAPI,
  LoanType,
  Version
};
