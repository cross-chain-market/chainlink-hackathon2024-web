export interface Collection {
  id: string;
  name: string;
  description: string;
  base_image_path: string;
  image_id: string;
  address: string | null;
  network_id: string;
  chain_id: string;
  items: Item[];
}

export type LocalCollection = Omit<Collection, "address">;

export interface Item {
  id: string;
  name: string;
  description: string;
  image_id: string;
  fiat_price: number;
  total_amount: number;
  listed_amount: number;
  attributes: { key: string; value: string }[];
}