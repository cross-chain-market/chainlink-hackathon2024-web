"use client";
import { ContractRunner, ethers } from "ethers";
import { chainInfo } from '../../../utils/helpers';

require("dotenv").config();
const contractJSON = require("./abi.json"); 
interface ContractAddresses {
  [key: string]: string;
}

const contractAddress: ContractAddresses = {
  'Localhost_avalanche_fuji': process.env.marketplace_avalanche_fuji_contract_address || '',
  'Development_avalanche_fuji': process.env.marketplace_avalanche_fuji_contract_address || '',
  'Preview_avalanche_fuji': process.env.marketplace_avalanche_fuji_contract_address || '',
  'Production': ''
};

export default class MarketplaceInterface {
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

  public buyListing(collectionAddress: string, listingId: number, amount: number) {
    this.contract.buyListing(collectionAddress, listingId, amount);
  }
}
