export interface LocalCollection {
  id: string;
  name: string;
  description: string;
  base_image_path: string;
  image_id: string;
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
  image_id: string;
  fiat_price: number;
  total_amount: number;
  listed_amount: number;
  attributes: { key: string; value: string }[];
  created_at: string;
  network_id: string;
  chain_id: number;
}
