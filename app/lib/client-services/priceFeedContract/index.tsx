"use client";
import { getChainId } from "@wagmi/core";
import { Address } from "viem";
import { chainInfo } from "../../../utils/helpers";
require("dotenv").config();
interface ContractAddresses {
  [key: string]: string;
}

import { readContract } from "@wagmi/core";
import { config } from "../../../../config";
const contractJSON = require("./abi.json");

export async function getAVAXUSD() {
  const chainId = getChainId(config);
  const chainData = chainInfo(chainId);

  const contractAddress: ContractAddresses = {
    Localhost_avalanche_fuji:
      process.env.priceFeed_avalanche_fuji_contract_address || "",
    Development_avalanche_fuji:
      process.env.priceFeed_avalanche_fuji_contract_address || "",
    Preview_avalanche_fuji:
      process.env.priceFeed_avalanche_fuji_contract_address || "",
    Production: "",
  };

  try {
    const address = contractAddress[
      `${process.env.WORKING_ENV}_${chainData.chain}` || "test" ] as Address;
      console.log(address, 'address', `${process.env.WORKING_ENV}_${chainData.chain}`)

    const decimals: number = Number(await readContract(config, {
      abi: contractJSON.abi,
      address,
      functionName: "getDecimals",
      args: []
    }));

    const res: number = Number(await readContract(config, {
      abi: contractJSON.abi,
      address,
      functionName: "getAVAXUSD",
      args: []
    }));
    return res / 10 ** decimals;
  } catch (err) {
    console.log(err);
  }
}
