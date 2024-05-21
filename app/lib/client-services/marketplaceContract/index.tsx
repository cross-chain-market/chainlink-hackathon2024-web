"use client";
import { getChainId } from "@wagmi/core";
import { Address, parseUnits } from "viem";
import { chainInfo } from "../../../utils/helpers";
import { getAVAXUSD } from "../priceFeedContract";

require("dotenv").config();
interface ContractAddresses {
  [key: string]: string;
}

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function buyListing(collectionAddress: string, listingId: number, amount: number, priceUSD: number) {
  const chainId = getChainId(config);
    const chainData = chainInfo(chainId);

  const contractAddress: ContractAddresses = {
    Localhost_avalanche_fuji:
      process.env.marketplace_avalanche_fuji_contract_address || "",
    Development_avalanche_fuji:
      process.env.marketplace_avalanche_fuji_contract_address || "",
    Preview_avalanche_fuji:
      process.env.marketplace_avalanche_fuji_contract_address || "",
    Production: "",
  };
  try {
    const priceConversion = await getAVAXUSD();
    if (!priceConversion) {
      alert('issue with getting price, please contact support');
      return;
    }
    const address = contractAddress[
      `${process.env.WORKING_ENV}_${chainData.chain}` || "test"
    ] as Address;
    const value = parseUnits(String(priceUSD / priceConversion), 18);
    await writeContract(config, {
      abi: contractJSON.abi,
      address,
      functionName: 'buyListing',
      args: [
        collectionAddress,
        listingId,
        amount
      ],
      value
    });
  } catch (err) {
    console.log(err);
    alert('buy transaction can not be completed, please contact support');
  }
}
