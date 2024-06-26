require("dotenv").config();

import { getAVAXUSD } from "../lib/client-services/priceFeedAvalancheContract";
import { getMATICUSD } from "../lib/client-services/priceFeedPolygonContract";

type ChainInfo = {
  network: string;
  chain: string;
  token: string;
  type: string;
};

export const shortAddress = (address: string) => {
  return address.slice(0, 7) + "....." + address.slice(-5);
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};

export const getDigits = (number: number | string) => {
  const numStr = String(number);

  // Split the string into an array of characters
  const digitsArray = numStr.split("");

  // Map each character back to a number
  return digitsArray.map((digit) => Number(digit));
};

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const chainInfo = (chainId: number) => {
  const nameHash: Record<number, ChainInfo> = {
    43113: { network: 'avalanche', chain: 'avalanche_fuji', token: 'AVAX', type: 'test'},
    43114: { network: 'avalanche', chain: 'avalanche', token: 'AVAX', type: 'main'},
    80002: { network: 'polygon', chain: 'amoy', token: 'MATIC', type: 'test'},
    137: { network: 'polygon', chain: 'amoy', token: 'MATIC', type: 'main'},
    1101: { network: 'polygon', chain: 'polygon-zkevm', token: 'ETH', type: 'main'},
    1442: { network: 'polygon', chain: 'polygon-zkevm-testnet', token: 'ETH', type: 'test'},
    1: { network: 'ethereum', chain: 'ethereum', token: 'ETH', type: 'main'},
    11155111: { network: 'ethereum', chain: 'sepolia', token: 'ETH', type: 'main' }
  };

  return nameHash[chainId];
}

export const networkOptions = [
  { label: "Avalanche", value: "avalanche" },
  { label: "Polygon", value: "polygon" },
  { label: "Arbitrum", value: "arbitrum" },
  { label: "Optimism", value: "optimism" },
  { label: "Ethereum", value: "ethereum" }
];

export const chainOptions = [
  { label: "Avalanche-Fuji", value: "43113" },
  { label: "Polyogon-Amoy", value: "80002" },
  { label: "Arbitrum Sepolia", value: "421614" },
  { label: "Optimism Sepolia", value: "11155420" },
  { label: "Sepolia", value: "11155111" }
];


export const priceConversionAggregator = async (chainId: number) => {
  switch (chainId) {
    case 43113:
      return await getAVAXUSD();
    case 80002:
      return await getMATICUSD();
    default:
      alert('this chain is not supported');
  } 
}

export const getFactoryContractAddress = (chainId: number) => {
  switch (chainId) {
    case 43113:
      return process.env["collectionsFactory_43113"] || "0x0";
    case 80002:
      return process.env["collectionsFactory_80002"] || "0x0";
    default:
      return "0x0";
  }
};


export const getMarketplaceContractAddress = (chainId: number) => {
  switch (chainId) {
    case 43113:
      return process.env["marketplace_43113"] || "0x0";
    case 80002:
      return process.env["marketplace_80002"] || "0x0";
    default:
      return "0x0";
  }
};

export const getPriceFeedContractAddress = (chainId: number) => {
  switch (chainId) {
    case 43113:
      return process.env["priceFeed_43113"] || "0x0";
    case 80002:
      return process.env["priceFeed_80002"] || "0x0";
    default:
      return "0x0";
  }
};

export const getMarketplaceAddress = (chainId: string): string => {
  switch (chainId) {
    case 43113:
      return '0xb65eFBCb305f8c5Fb13ec3A7c2b1658046E8290d';
    case 80002:
      return '0x1866380708C7EeC51C8557E40ba98ECe37f61dF0';
    default:
      return "0x0";
  }
}