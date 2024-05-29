"use client";

import Image from "next/image";
import { useAccount } from 'wagmi'
import { ActionIcon, Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { CreateItemModal } from "@/app/components/CreateItemModal";
import { ApproveCollectionModal } from "@/app/components/ApproveCollectionModal";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import { LocalCollection } from "@/app/types/marketplace";
import { createCollection } from "@/app/lib/services";
export default function Page({
  params,
}: {
  params: { collectionAddressOrId: string };
}) {
  const [collection, setCollection] = useState<LocalCollection | undefined>(
    undefined
  );

  const { address } = useAccount();
  const [opened, { open, close }] = useDisclosure(false);
  const [ApproveDialogOpened, { open: openApprove, close: closeApprove }] = useDisclosure(false);
  const { collections, removeItem, updateCollectionId, updateCollectionSaleApproval } = useLocalCollections();

  useEffect(() => {
    const foundCollection = collections.find(
      (collection) => collection.id === params.collectionAddressOrId
    );
    setCollection(foundCollection);
  }, [collections, params.collectionAddressOrId]);

  async function publishCollection() {
    const collection = collections.find(
      (collection) => collection.id === params.collectionAddressOrId
    );

    if (!collection) {
      return;
    }

    console.log({
      collection,
      address
    });
    if (address && collection) {
      const res = await createCollection(collection, address);
      if(collection?.id && res?.id) {
        updateCollectionId(collection.id, res.id);
      }
    }
  }

  function approveCollection() {
    openApprove();
  }

  if (!collection) {
    return null;
  }

  return (
    <>
    <div style={{ width: '100%', height: '230px', position: 'relative', paddingBottom: '2' }}>
          <Image
            src={`https://ipfs.io/ipfs/${collection.base_hash}/collection_banner.png`}
            alt="banner image"
            layout="fill"
            quality={100}
            className="object-cover"
          />
        </div>
      <header className="flex justify-between mb-5">
        <div>
          <h2 className="font-bold text-xl">{collection.name}</h2>
          <p className="w-100">{collection.description}</p>
          <p className="w-100">{collection.address}</p>
        </div>

        {address && <div className="flex gap-2">
          <Button variant="outline" onClick={open} disabled={collection.address ?? false}>
            Add Item
          </Button>
          <Button disabled={collection.items.length === 0 || collection.address || false} onClick={publishCollection}>Publish Collection</Button>
          <Button disabled={!collection.address} onClick={approveCollection}>{collection.isApproved ? "Revok approval" : "Approve Collection Sale"}</Button>
        </div>}
      </header>

      <section>
        <h3 className="text-lg font-semibold">Items in store</h3>

        <Table className="border-solid border-1 border-gray-600">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Image id</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Total Amount</Table.Th>
              <Table.Th>Listed Amount</Table.Th>
              <Table.Th>Attributes</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {collection.items.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.image_id}</Table.Td>
                <Table.Td>{item.description}</Table.Td>
                <Table.Td>${item.fiat_price}</Table.Td>
                <Table.Td>{item.total_amount}</Table.Td>
                <Table.Td>{item.listed_amount}</Table.Td>
                <Table.Td>
                  {item.attributes.reduce(
                    (acc, curr) => acc + `${curr.key}:${curr.value} `,
                    ""
                  )}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    disabled={collection.address || false}
                    variant="default"
                    radius="xl"
                    onClick={() => removeItem(collection.id, item.id)}
                    className="border-red-600"
                  >
                    <IconTrash className="size-4 text-red-600" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </section>

      {/* <section>
        <h3 className="text-lg font-semibold">Transactions</h3>

        <Table.ScrollContainer minWidth={500}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>TX Hash</Table.Th>
                <Table.Th>Shipment ID</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Buyer Account</Table.Th>
                <Table.Th>Buyer Chain</Table.Th>
                <Table.Th>Buyer Network</Table.Th>
                <Table.Th>Seller Network</Table.Th>
                <Table.Th>Seller Chain</Table.Th>
                <Table.Th>Seller Account</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody></Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </section> */}

      <CreateItemModal
        baseHash={collection.base_hash}
        onClose={close}
        opened={opened}
        collectionId={collection.id}
      />
      <ApproveCollectionModal
        collectionId={collection.id}
        collectionAddress={collection.address}
        opened={ApproveDialogOpened}
        onClose={closeApprove}
        isApproved={collection.isApproved}
      />
    </>
  );
}
