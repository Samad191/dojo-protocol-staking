import { clusterApiUrl } from "@solana/web3.js";

// export const SERVER_URL = 'http://localhost:4000';
// export const SOLANA_RPC = 'https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66'
export const SOLANA_RPC = 'https://mainnet.helius-rpc.com/?api-key=9fff21f6-b15c-4d4a-97bf-b308b83439c5'
// export const SOLANA_RPC = clusterApiUrl("devnet")

export const shortenSolanaAddress = (
  address: string,
  startLength = 4,
  endLength = 4
) => {
  if (!address) return "";

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
};


export const showNumber = (num: string, decimals = 6) => {
  const splitted = num.toString().split('.')
  console.log('splitted', splitted[1])
  if(splitted[1]?.length > decimals) {
    return `${splitted[0]}.${splitted[1].slice(0, decimals)}`
  }
  else return num.toString()
}

export const getNumberForInputField = (input: string) => {
  if (input && input[input.length - 1].match("[0-9.]")) {
    const splittedArray = input.split(".");
    console.log("kar splittedArray", splittedArray);
    if(!splittedArray[1] && !splittedArray[0]){
      console.log("mark1")
      return '0.';
    }else if(splittedArray[1] && !splittedArray[0]){
      console.log("mark2")
      return `0.${splittedArray[1].slice(0,6)}`;
    }else if(splittedArray[1] && splittedArray[0]){
      console.log("mark3")
      return `${splittedArray[0]}.${splittedArray[1].slice(0,6)}`;
    } else {
      console.log("mark4")
      return input;
    }
  } else {
    return false;
  }
}