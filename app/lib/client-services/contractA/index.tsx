"use client";
import { ethers } from "ethers";
require("dotenv").config();
const contractJSON = require("./abi.json"); 
interface ContractAddresses {
  [key: string]: string;
}

const contractAddress: ContractAddresses = {
  'Localhost': process.env.eth_localhost_contract_address || '',
  'Development': process.env.eth_sepolia_contract_address || '',
  'Preview': process.env.eth_sepolia_contract_address || '',
  'Production': ''
};
const webSocketProvider = process.env.eth_sepolia_webSocketProvider || '';

export default class ContractInterface {
  private contract: any;
  private signer: any;
  private provider: any;
  private wsProvider: any;

  
  constructor() {}

  public async init() {
    const cAddress = contractAddress[process.env.my_env || 'test'];
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(cAddress, contractJSON.abi, this.signer);
    const ws = new ethers.WebSocketProvider(webSocketProvider);
    if (ws) {
      this.wsProvider = new ethers.Contract(cAddress, contractJSON.abi, ws);
    }
    console.log('env:' , process.env.my_env);
  }

  public getWebSocket() {
    return this.wsProvider;
  }

  public getSignerAddress() {
    return this.signer?.address;
  }
}
