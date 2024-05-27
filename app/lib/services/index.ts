import axios from "axios";
import { LocalCollection, Item } from "@/app/types/marketplace";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";

import { deployCollection } from '../client-services/collectionFactoryContract';

const API_URL = "http://localhost:8081/v1/users";

export async function createCollection(collection: LocalCollection, userAccount: string): Promise<LocalCollection | null> {
  try {
    const clonedData = JSON.parse(JSON.stringify(collection));
    clonedData.chain_id = Number(collection.chain_id);
    clonedData.items.forEach((item: any) => {
      item.image_id = String(item.image_id);
      let att: any = {};
      item.attributes.forEach((attribute: any) => {
        att[attribute.key] = attribute.value;
      });
      item.attributes = att;
    });
    const response = await axios.post(`${API_URL}/${userAccount}/collections`, clonedData);

    // deploy to blockchain
    await deployCollection(
      collection.name,
      collection.items.map((item:any) => item.image_id),
      collection.items.map((item:any) => item.listed_amount),
      collection.base_image_path
    );

    return response.data;


  } catch (error) {
    console.error("Error createCollection: ", error);
    return null;
  }
}

export async function getAllCollectionsByAccount(userAccount: string): Promise<LocalCollection[]> {
  const response = await axios.get(`${API_URL}/users/${userAccount}/collections`);
  return response.data;
}

export async function getAllCollectionsByAccountAndCollectionId(userAccount: string, collectionId: string): Promise<LocalCollection> {
  const response = await axios.get(`${API_URL}/users/${userAccount}/collections/${collectionId}`);
  return response.data;
}

export async function getListings(): Promise<Item[]> {
  const response = await axios.get(`${API_URL}/listings`);
  return response.data;
}

export async function buyListing(collectionId: string, itemId: string, from: string, to: string, amount: number): Promise<Item[]> {
  const response = await axios.post(`${API_URL}/collections/${collectionId}/items/${itemId}/buy`,{
    "from_address": from,
    "to_address": to,
    "amount": amount
  });
  return response.data;
}