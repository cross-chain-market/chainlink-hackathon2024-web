import axios from "axios";
import { LocalCollection } from "@/app/types/marketplace";
import { deployCollection } from '../client-services/collectionFactoryContract';

const API_URL = "http://localhost:8081/v1/users";

export async function createCollection(collection: LocalCollection, userAccount: string): Promise<any> {
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

    //return response.data;
  } catch (error) {
    console.error("Error createCollection: ", error);
    return null;
  }
}
