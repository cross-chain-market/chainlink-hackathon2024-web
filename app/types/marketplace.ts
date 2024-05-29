import { Address } from "viem";

export interface LocalCollection {
  id: string;
  name: string;
  description: string;
  base_hash: string;
  image_id: number;
  network_id: string;
  chain_id: string;
  items: Item[];
  address?: string;
  isApproved?: boolean;
}

export interface Item {
  id: string;
  collection_id: string;
  name: string;
  description: string;
  image_id: number;
  fiat_price: number;
  total_amount: number;
  listed_amount: number;
  attributes: { key: string; value: string }[];
  created_at: string;
  network_id: string;
  chain_id: number;
  address: string;
}

export interface Product {
  id: number;
  collection_id: number;
  name: string;
  description: string;
  image_id: number;
  fiat_price: number;
  total_amount: number;
  listed_amount: number;
  address: string;
  sku: string;
  attributes: {
    attribute: string;
    value: string;
  }[];
  created_at: string;
  network_id: string;
  BaseHash: string;
  chain: number;
  platform_fee: number;
  shipping: number;
}

export interface IBuyItemPayload {
  from_address: Address;
  to_address: Address;
  amount: number;
}
