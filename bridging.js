


const fromChain = 'ETH';
const fromToken = 'WETH';
const toChain = 'ARB';
const toToken = 'WETH';
const fromAmount = '1000000';
const fromAddress = "0xb66284947F9A35bD9FA893D444F19033FeBdA4A1";

const quote = await getQuote(fromChain, toChain, fromToken, toToken, fromAmount, fromAddress);

console.log(quote)



