"use client";
import { ContractRunner, ethers } from "ethers";
import { chainInfo } from '../../../utils/helpers';

require("dotenv").config();
const contractJSON = require("./abi.json"); 
interface ContractAddresses {
  [key: string]: string;
}

export default class priceFeedInterface {
  private contract: any;
  private cAddress: string | null = null;

  private contractAddress: ContractAddresses = {
    'Localhost_avalanche_fuji': process.env.priceFeed_avalanche_fuji_contract_address || '',
    'Development_avalanche_fuji': process.env.priceFeed_avalanche_fuji_contract_address || '',
    'Preview_avalanche_fuji': process.env.priceFeed_avalanche_fuji_contract_address || '',
    'Production': ''
  };

  constructor() {
  }

  public async init(chainId: number | null, signer: ContractRunner) {
    if (chainId) {
      const chainData = chainInfo(chainId);
      this.cAddress = this.contractAddress[`${process.env.WORKING_ENV}_${chainData.chain}` || 'test'];
      this.contract = new ethers.Contract(this.cAddress, contractJSON.abi, signer);
    }
  }

  public async getAVAXUSD() {
    try {
      const decimals = await this.contract.getDecimals();
      const res = await this.contract.getAVAXUSD() / (10 ** decimals);
      return res;
    } catch(err: any) {
      err.reason && alert(err.reason);
    }
  }
}