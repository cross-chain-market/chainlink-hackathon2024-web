"use client";
import { ContractRunner, ethers } from "ethers";
import { chainInfo } from "../../../utils/helpers";

require("dotenv").config();
const contractJSON = require("./abi.json");
interface ContractAddresses {
  [key: string]: string;
}

const contractAddress: ContractAddresses = {
  Localhost_avalanche_fuji:
    process.env.collectionsFactory_avalanche_fuji_contract_address || "",
  Development_avalanche_fuji:
    process.env.collectionsFactory_avalanche_fuji_contract_address || "",
  Preview_avalanche_fuji:
    process.env.collectionsFactory_avalanche_fuji_contract_address || "",
  Production: "",
};

const marketplaceAddress =
  process.env.marketplace_avalanche_fuji_contract_address;

export default class CollectionFactoryInterface {
  private contract: any;
  private cAddress: string | null = null;

  constructor() {
  }

  public async init(chainId: number | null, signer: ContractRunner) {
    if (chainId) {
      const chainData = chainInfo(chainId);
      this.cAddress = contractAddress[`${process.env.WORKING_ENV}_${chainData.chain}` || 'test'];
      this.contract = new ethers.Contract(this.cAddress, contractJSON.abi, signer);
    }
  }

  public async deployCollection(
    name: string,
    ids: number[],
    totalAmounts: number[],
    baseHash: string,
  ) {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      const tx = await this.contract.deployCollection(name, ids, totalAmounts, baseHash, marketplaceAddress);
      console.log('Transaction response:', tx);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);
    } catch (error: any) {
      console.error('Error sending transaction:', error.message);
    }
  }
}
