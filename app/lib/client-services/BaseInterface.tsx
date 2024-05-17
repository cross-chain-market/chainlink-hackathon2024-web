"use client";
import { ethers } from "ethers";

require("dotenv").config();

export default class BaseInterface {
  protected signer: any;
  protected provider: any;
  protected chainId: number | null = null;

  constructor() {}

  public async init() {
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    
    // Request access to the user's MetaMask account
    await this.provider.send("eth_requestAccounts", []);
    
    this.signer = await this.provider.getSigner();
    const { chainId } = await this.provider.getNetwork();
    if (chainId) {
      this.chainId = Number(chainId);
    }
  }

  public getChainId() {
    return this.chainId;
  }

  public getSigner() {
    return this.signer;
  }
}