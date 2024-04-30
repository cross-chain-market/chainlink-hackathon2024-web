import axios from "axios";
import IItems from "./interface";

const API_URL = "https://660193f487c91a11641b2b2e.mockapi.io/api/v1";

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
  const {id} = data;
  try {
    const response = await axios.put(`${API_URL}/items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    return null;
  }
}
