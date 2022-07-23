export let NFTFI_ABI = [{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_nftfiHub","type":"address"},{"internalType":"address[]","name":"_permittedErc20s","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"newAdminFee","type":"uint16"}],"name":"AdminFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc20Contract","type":"address"},{"indexed":false,"internalType":"bool","name":"isPermitted","type":"bool"}],"name":"ERC20Permit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"loanId","type":"uint32"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"indexed":false,"internalType":"uint256","name":"loanPrincipalAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nftCollateralId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"loanMaturityDate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"loanLiquidationDate","type":"uint256"},{"indexed":false,"internalType":"address","name":"nftCollateralContract","type":"address"}],"name":"LoanLiquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"loanId","type":"uint32"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"indexed":false,"internalType":"uint32","name":"newLoanDuration","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"newMaximumRepaymentAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"renegotiationFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"renegotiationAdminFee","type":"uint256"}],"name":"LoanRenegotiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"loanId","type":"uint32"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"indexed":false,"internalType":"uint256","name":"loanPrincipalAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"nftCollateralId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountPaidToLender","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"adminFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"revenueShare","type":"uint256"},{"indexed":false,"internalType":"address","name":"revenueSharePartner","type":"address"},{"indexed":false,"internalType":"address","name":"nftCollateralContract","type":"address"},{"indexed":false,"internalType":"address","name":"loanERC20Denomination","type":"address"}],"name":"LoanRepaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"loanId","type":"uint32"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"components":[{"internalType":"uint256","name":"loanPrincipalAmount","type":"uint256"},{"internalType":"uint256","name":"maximumRepaymentAmount","type":"uint256"},{"internalType":"uint256","name":"nftCollateralId","type":"uint256"},{"internalType":"address","name":"loanERC20Denomination","type":"address"},{"internalType":"uint32","name":"loanDuration","type":"uint32"},{"internalType":"uint16","name":"loanInterestRateForDurationInBasisPoints","type":"uint16"},{"internalType":"uint16","name":"loanAdminFeeInBasisPoints","type":"uint16"},{"internalType":"address","name":"nftCollateralWrapper","type":"address"},{"internalType":"uint64","name":"loanStartTime","type":"uint64"},{"internalType":"address","name":"nftCollateralContract","type":"address"},{"internalType":"address","name":"borrower","type":"address"}],"indexed":false,"internalType":"struct LoanData.LoanTerms","name":"loanTerms","type":"tuple"},{"components":[{"internalType":"address","name":"revenueSharePartner","type":"address"},{"internalType":"uint16","name":"revenueShareInBasisPoints","type":"uint16"},{"internalType":"uint16","name":"referralFeeInBasisPoints","type":"uint16"}],"indexed":false,"internalType":"struct LoanData.LoanExtras","name":"loanExtras","type":"tuple"}],"name":"LoanStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaximumLoanDuration","type":"uint256"}],"name":"MaximumLoanDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"HUNDRED_PERCENT","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOAN_COORDINATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LOAN_TYPE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"loanPrincipalAmount","type":"uint256"},{"internalType":"uint256","name":"maximumRepaymentAmount","type":"uint256"},{"internalType":"uint256","name":"nftCollateralId","type":"uint256"},{"internalType":"address","name":"nftCollateralContract","type":"address"},{"internalType":"uint32","name":"loanDuration","type":"uint32"},{"internalType":"uint16","name":"loanAdminFeeInBasisPoints","type":"uint16"},{"internalType":"address","name":"loanERC20Denomination","type":"address"},{"internalType":"address","name":"referrer","type":"address"}],"internalType":"struct LoanData.Offer","name":"_offer","type":"tuple"},{"components":[{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"signer","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct LoanData.Signature","name":"_signature","type":"tuple"},{"components":[{"internalType":"address","name":"revenueSharePartner","type":"address"},{"internalType":"uint16","name":"referralFeeInBasisPoints","type":"uint16"}],"internalType":"struct LoanData.BorrowerSettings","name":"_borrowerSettings","type":"tuple"}],"name":"acceptOffer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminFeeInBasisPoints","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nonce","type":"uint256"}],"name":"cancelLoanCommitmentBeforeLoanHasBegun","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"drainERC1155Airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"drainERC20Airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"drainERC721Airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_erc20","type":"address"}],"name":"getERC20Permit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"getPayoffAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_nonce","type":"uint256"}],"name":"getWhetherNonceHasBeenUsedForUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hub","outputs":[{"internalType":"contract INftfiHub","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"liquidateOverdueLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"loanIdToLoan","outputs":[{"internalType":"uint256","name":"loanPrincipalAmount","type":"uint256"},{"internalType":"uint256","name":"maximumRepaymentAmount","type":"uint256"},{"internalType":"uint256","name":"nftCollateralId","type":"uint256"},{"internalType":"address","name":"loanERC20Denomination","type":"address"},{"internalType":"uint32","name":"loanDuration","type":"uint32"},{"internalType":"uint16","name":"loanInterestRateForDurationInBasisPoints","type":"uint16"},{"internalType":"uint16","name":"loanAdminFeeInBasisPoints","type":"uint16"},{"internalType":"address","name":"nftCollateralWrapper","type":"address"},{"internalType":"uint64","name":"loanStartTime","type":"uint64"},{"internalType":"address","name":"nftCollateralContract","type":"address"},{"internalType":"address","name":"borrower","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"loanIdToLoanExtras","outputs":[{"internalType":"address","name":"revenueSharePartner","type":"address"},{"internalType":"uint16","name":"revenueShareInBasisPoints","type":"uint16"},{"internalType":"uint16","name":"referralFeeInBasisPoints","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"}],"name":"loanRepaidOrLiquidated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maximumLoanDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"mintObligationReceipt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"payBackLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"},{"internalType":"address","name":"_target","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"},{"internalType":"address","name":"_nftAirdrop","type":"address"},{"internalType":"uint256","name":"_nftAirdropId","type":"uint256"},{"internalType":"bool","name":"_is1155","type":"bool"},{"internalType":"uint256","name":"_nftAirdropAmount","type":"uint256"}],"name":"pullAirdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"},{"internalType":"uint32","name":"_newLoanDuration","type":"uint32"},{"internalType":"uint256","name":"_newMaximumRepaymentAmount","type":"uint256"},{"internalType":"uint256","name":"_renegotiationFee","type":"uint256"},{"internalType":"uint256","name":"_lenderNonce","type":"uint256"},{"internalType":"uint256","name":"_expiry","type":"uint256"},{"internalType":"bytes","name":"_lenderSignature","type":"bytes"}],"name":"renegotiateLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_erc20","type":"address"},{"internalType":"bool","name":"_permit","type":"bool"}],"name":"setERC20Permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_erc20s","type":"address[]"},{"internalType":"bool[]","name":"_permits","type":"bool[]"}],"name":"setERC20Permits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_newAdminFeeInBasisPoints","type":"uint16"}],"name":"updateAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newMaximumLoanDuration","type":"uint256"}],"name":"updateMaximumLoanDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_loanId","type":"uint32"}],"name":"wrapCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export let ERC721_ABI = [{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]

export let ERC20_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
