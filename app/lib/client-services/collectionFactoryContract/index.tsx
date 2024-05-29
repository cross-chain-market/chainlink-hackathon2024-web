"use client";
import { getChainId } from "@wagmi/core";
import { Address } from "viem";
import { getMarketplaceContractAddress, getFactoryContractAddress } from "../../../utils/helpers";

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function deployCollection(name: string, ids: number[], amounts: number[], baseHash: string) {
  const chainId = getChainId(config);

  const marketplaceAddress = getMarketplaceContractAddress(chainId) as Address;
  try {
    const factoryAddress = getFactoryContractAddress(chainId) as Address;
    await writeContract(config, {
      abi: contractJSON.abi,
      address: factoryAddress,   
      functionName: 'deployCollection',
      args: [
        name,
        ids,
        amounts,
        baseHash,
        marketplaceAddress
      ]
    });
  } catch (err) {
    console.log(err);
  }
}
