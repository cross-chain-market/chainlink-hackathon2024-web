"use client";
import { getChainId } from "@wagmi/core";
import { Address } from "viem";
import { getPriceFeedContractAddress } from "../../../utils/helpers";

import { readContract } from "@wagmi/core";
import { config } from "../../../../config";
const contractJSON = require("./abi.json");

export async function getAVAXUSD() {
  const chainId = getChainId(config);

  try {
    const address = getPriceFeedContractAddress(chainId) as Address;
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
