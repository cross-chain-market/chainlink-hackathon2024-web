"use client";
import { Address } from "viem";
require("dotenv").config();

import { writeContract } from '@wagmi/core';
import { config } from '../../../../config';
const contractJSON = require("./abi.json");

export async function sendMessage(newMessage: string) {

    const pingAddress = process.env.ping_avalanche_fuji_contract_address || "0x0" as Address;

  try {
    await writeContract(config, {
      abi: contractJSON.abi,
      address: pingAddress as Address,
      functionName: 'update',
      args: [
        newMessage
      ]MantineProvidersrs
    });
  } catch (err) {
    console.log(err);
    alert('newMessage can not be completed, please contact support');
  }
}
