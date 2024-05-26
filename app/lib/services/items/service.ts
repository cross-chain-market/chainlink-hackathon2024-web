import axios from "axios";
import IItems from "./interface";
import { IBuyItemPayload, Product } from "@/app/types/marketplace";

const API_URL = "https://660193f487c91a11641b2b2e.mockapi.io/api/v1";
const LOCALHOST_API_URL = "http://localhost:8081/v1";

export async function getAllItems(): Promise<IItems[] | null> {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return null;
  }
}

export async function buyItem(payload: IBuyItemPayload): Promise<any | null> {
  try {
    const response = await axios.post(
      `${API_URL}/collections/1/items/1/buy`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return null;
  }
}

export async function getAllListing(): Promise<Product[] | null> {
  try {
    const response = await axios.get(`${LOCALHOST_API_URL}/listings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
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
