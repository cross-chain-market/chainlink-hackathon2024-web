import axios from "axios";
import IItems from "./interface";
import { Product } from "@/app/types/marketplace";

const API_URL = "https://660193f487c91a11641b2b2e.mockapi.io/api/v1";

export const dummyProducts: Product[] = [
  {
    id: 1,
    collection_id: 101,
    name: "Blockchain T-Shirt",
    description: "A stylish T-shirt with a blockchain theme.",
    image_id: "img1",
    fiat_price: 25.99,
    total_amount: 100,
    listed_amount: 80,
    attributes: [
      {
        attribute: "Cotton",
        value: "Unisex",
      },
    ],
    created_at: "2023-05-15T10:00:00Z",
    network: "Avalanche",
    chain: 1,
    sku: "sz23121436482489898",
    platform_fee: 3,
    shipping: 10,
  },
  {
    id: 2,
    collection_id: 101,
    name: "Crypto Mug",
    description: "A mug with a unique crypto design.",
    image_id: "img2",
    fiat_price: 15.99,
    total_amount: 200,
    listed_amount: 150,
    attributes: [
      {
        attribute: "Ceramic",
        value: "Dishwasher Safe",
      },
    ],
    created_at: "2023-05-16T11:00:00Z",
    network: "Optimism",
    chain: 137,
    sku: "s93849j94436482489448",
    platform_fee: 1,
    shipping: 10,
  },
  {
    id: 3,
    collection_id: 102,
    name: "DeFi Hat",
    description: "A cool hat for DeFi enthusiasts.",
    image_id: "img3",
    fiat_price: 19.99,
    total_amount: 50,
    listed_amount: 40,
    attributes: [
      {
        attribute: "A3 Size",
        value: "Signed",
      },
    ],
    created_at: "2023-05-17T12:00:00Z",
    network: "Optimism",
    chain: 56,
    sku: "3939fm4436482489344",
    platform_fee: 2,
    shipping: 20,
  },
  {
    id: 4,
    collection_id: 103,
    name: "NFT Art Print",
    description: "A limited edition NFT art print.",
    image_id: "img4",
    fiat_price: 100.0,
    total_amount: 30,
    listed_amount: 25,
    attributes: [
      {
        attribute: "A3 Size",
        value: "Signed",
      },
    ],
    created_at: "2023-05-18T13:00:00Z",
    network: "Avalanche",
    chain: 43114,
    sku: "02924949499994m9",
    platform_fee: 4,
    shipping: 1,
  },
  {
    id: 5,
    collection_id: 104,
    name: "Smart Contract Notebook",
    description: "A notebook with smart contract code snippets.",
    image_id: "img5",
    fiat_price: 12.99,
    total_amount: 150,
    listed_amount: 120,
    attributes: [
      {
        attribute: "Hardcover",
        value: "Lined Pages",
      },
    ],
    created_at: "2023-05-19T14:00:00Z",
    network: "Optimism",
    chain: 101,
    sku: "s4444214364824892333",
    platform_fee: 2,
    shipping: 5,
  },
  {
    id: 6,
    collection_id: 105,
    name: "Crypto Sticker Pack",
    description: "A pack of 10 crypto-themed stickers.",
    image_id: "img6",
    fiat_price: 5.99,
    total_amount: 500,
    listed_amount: 450,
    attributes: [
      {
        attribute: "Vinyl",
        value: "Waterproof",
      },
    ],
    created_at: "2023-05-20T15:00:00Z",
    network: "Abitrum",
    chain: 1337,
    sku: "sz3421434494248944",
    platform_fee: 8,
    shipping: 10,
  },
  {
    id: 7,
    collection_id: 106,
    name: "Mining Rig Poster",
    description: "A poster showcasing a mining rig setup.",
    image_id: "img7",
    fiat_price: 9.99,
    total_amount: 100,
    listed_amount: 90,
    attributes: [
      {
        attribute: "Glossy",
        value: "18x24 inches",
      },
    ],
    created_at: "2023-05-21T16:00:00Z",
    network: "Abitrum",
    chain: 3,
    sku: "sz23849384983849",
    platform_fee: 4,
    shipping: 9,
  },
  {
    id: 8,
    collection_id: 107,
    name: "Crypto Socks",
    description: "Comfortable socks with a crypto pattern.",
    image_id: "img8",
    fiat_price: 14.99,
    total_amount: 200,
    listed_amount: 180,
    attributes: [
      {
        attribute: "Cotton",
        value: "One Size Fits All",
      },
    ],
    created_at: "2023-05-22T17:00:00Z",
    network: "Abitrum",
    chain: 4,
    sku: "sz2312134940948944",
    platform_fee: 1,
    shipping: 4,
  },
  {
    id: 9,
    collection_id: 108,
    name: "Blockchain Backpack",
    description: "A backpack with multiple compartments for tech gear.",
    image_id: "img9",
    fiat_price: 49.99,
    total_amount: 60,
    listed_amount: 50,
    attributes: [{ attribute: "Water Resistant", value: "Laptop Compartment" }],
    created_at: "2023-05-23T18:00:00Z",
    network: "Optimism",
    chain: 5,
    sku: "sz2348308308484i340",
    platform_fee: 4,
    shipping: 5,
  },
  {
    id: 10,
    collection_id: 109,
    name: "Crypto Keychain",
    description: "A keychain with a crypto logo.",
    image_id: "img10",
    fiat_price: 7.99,
    total_amount: 300,
    listed_amount: 270,
    attributes: [
      {
        attribute: "Metal",
        value: "Engraved",
      },
    ],
    created_at: "2023-05-24T19:00:00Z",
    network: "Amoy",
    chain: 6,
    sku: "sz23121436482489898",
    platform_fee: 3,
    shipping: 1,
  },
  {
    id: 11,
    collection_id: 110,
    name: "Decentralized Finance Guide",
    description: "An in-depth guide to decentralized finance.",
    image_id: "img11",
    fiat_price: 29.99,
    total_amount: 80,
    listed_amount: 70,
    attributes: [{ attribute: "Paperback", value: "Illustrated" }],
    created_at: "2023-05-25T20:00:00Z",
    network: "Amoy",
    chain: 7,
    sku: "sz23121436482489898",
    platform_fee: 3,
    shipping: 10,
  },
  {
    id: 12,
    collection_id: 111,
    name: "Crypto Wallet Case",
    description: "A case for storing hardware wallets.",
    image_id: "img12",
    fiat_price: 19.99,
    total_amount: 100,
    listed_amount: 85,
    attributes: [
      {
        attribute: "Leather",
        value: "Compact",
      },
    ],
    created_at: "2023-05-26T21:00:00Z",
    network: "Amoy",
    chain: 8,
    sku: "sz23121436482489898",
    platform_fee: 5,
    shipping: 10,
  },
];

export async function getAllItems(): Promise<IItems[] | null> {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return null;
  }
}

export async function getItemById(itemId: string): Promise<IItems | null> {
  try {
    const response = await axios.get(`${API_URL}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with ID ${itemId}:`, error);
    return null;
  }
}

export async function deleteItem(itemId: string) {
  try {
    const response = await axios.delete(`${API_URL}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with ID ${itemId}:`, error);
    return null;
  }
}

export async function updateItem(data: IItems) {
  const { id } = data;
  try {
    const response = await axios.put(`${API_URL}/items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    return null;
  }
}
