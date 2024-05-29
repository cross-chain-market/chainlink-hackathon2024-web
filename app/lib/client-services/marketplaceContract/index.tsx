"use client";
import { getChainId } from "@wagmi/core";
import { Address, parseUnits } from "viem";
import { priceConversionAggregator, getMarketplaceContractAddress } from "../../../utils/helpers";

import { writeContract } from '@wagmi/core'
import { config } from '../../../../config'
const contractJSON = require("./abi.json");

export async function buyListingFromBlockchain(userAccount: string, collectionAddress: string, listingId: number, amount: number, priceUSD: number, destinationChainId: number) {
  const chainId = getChainId(config);

  try {
    const address = getMarketplaceContractAddress(chainId) as Address;
    debugger;
    const priceConversion = await priceConversionAggregator(chainId);
    if (!priceConversion) {
      alert('issue with getting price, please contact support');
      return;
    }

    const value = parseUnits(String(priceUSD / priceConversion), 18);
    await writeContract(config, {
      abi: contractJSON.abi,
      address,
      functionName: 'CCIPBuyListing',
      args: [
        userAccount,
        destinationChainId,
        collectionAddress,
        listingId,
        amount
      ],
      value
    });
  } catch (err) {
    console.log(err);
    alert('buy transaction can not be completed, please contact support');
    throw err;
  }
}
