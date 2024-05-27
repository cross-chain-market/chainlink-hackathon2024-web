import { useLocalStorage } from "@mantine/hooks";
import { v4 } from "uuid";

import { LocalCollection, Item } from "../types/marketplace";

const LOCAL_COLLECTIONS_KEY = "local-collections@cross-chain-marketplace-1.0.0";

export function useLocalCollections() {
  const [collections, setCollections] = useLocalStorage<LocalCollection[]>({
    key: LOCAL_COLLECTIONS_KEY,
    defaultValue: [],
  });

  function createCollection(
    newCollection: Omit<LocalCollection, "id" | "items">
  ) {
    const id = v4();
    const collectionWithId = { ...newCollection, id, items: [] };
    setCollections((prevCollections) => [...prevCollections, collectionWithId]);
    return collectionWithId;
  }

  function removeCollection(collectionId: string) {
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== collectionId)
    );
  }

  function addItem(collectionId: string, newItem: Omit<Item, "id">) {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              items: [...collection.items, { ...newItem, id: v4() }],
            }
          : collection
      )
    );
  }

  function removeItem(collectionId: string, itemId: string) {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              items: collection.items.filter((item) => item.id !== itemId),
            }
          : collection
      )
    );
  }

  function updateCollectionId(id: string, collectionId: string) {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              collectionId
            }
          : collection
      )
    );
  }

  function updateCollectionAddress(name: string, address: string) {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.name === name
          ? {
              ...collection,
              address
            }
          : collection
      )
    );
  }

  function updateCollectionSaleApproval(id: string, isApproved: boolean) {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              isApproved
            }
          : collection
      )
    );
  }

  return {
    collections,
    setCollections,
    createCollection,
    removeCollection,
    addItem,
    removeItem,
    updateCollectionId,
    updateCollectionAddress,
    updateCollectionSaleApproval
  };
}
