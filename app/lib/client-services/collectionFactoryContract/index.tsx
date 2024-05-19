"use client";
import { getChainId } from "@wagmi/core";
import { Address, parseEther } from "viem";
import { chainInfo } from "../../../utils/helpers";

require("dotenv").config();
interface ContractAddresses {
  [key: string]: string;
}

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function deployCollection(name: string, ids: number[], amounts: number[], baseHash: string) {
  const chainId = getChainId(config);
    const chainData = chainInfo(chainId);

    const marketplaceAddress = process.env.marketplace_avalanche_fuji_contract_address || "0x0" as Address;

  const contractAddress: ContractAddresses = {
    Localhost_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Development_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Preview_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Production: "",
  };
  try {
    const result = await writeContract(config, {
      abi: contractJSON.abi,
      address: contractAddress[
        `${process.env.WORKING_ENV}_${chainData.chain}` || "test"
      ] as Address,
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
