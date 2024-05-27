"use client";
import { Address } from "viem";
require("dotenv").config();

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function allowMarketplaceToSellCollection(collectionAddress: string, marketplaceAddress: string, approve: boolean) {
  await writeContract(config, {
    abi: contractJSON.abi,
    address: collectionAddress as Address,
    functionName: 'setApprovalForAll',
    args: [
      marketplaceAddress,
      approve
    ]
  });
}
