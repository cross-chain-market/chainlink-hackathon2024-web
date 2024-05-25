"use client";
import { Address } from "viem";
require("dotenv").config();

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function allowMarketplaceToSellCollection(collectionAddress: string, marketplaceAddress: string, approve: boolean) {
  try {
    await writeContract(config, {
      abi: contractJSON.abi,
      address: collectionAddress as Address,
      functionName: 'setApprovalForAll',
      args: [
        marketplaceAddress,
        approve
      ]
    });
  } catch (err) {
    console.log(err);
    alert('setApprovalForAll can not be completed, please contact support');
  }
}
