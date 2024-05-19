"use client";

import Image from "next/image";
import { ActionIcon, Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";

import { CreateItemModal } from "@/app/components/CreateItemModal";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import { LocalCollection } from "@/app/types/marketplace";

export default function Page({
  params,
}: {
  params: { collectionAddressOrId: string };
}) {
  const [collection, setCollection] = useState<LocalCollection | undefined>(
    undefined
  );

  const [opened, { open, close }] = useDisclosure(false);
  const { collections, removeItem } = useLocalCollections();

  useEffect(() => {
    const foundCollection = collections.find(
      (collection) => collection.id === params.collectionAddressOrId
    );
    setCollection(foundCollection);
  }, [collections, params.collectionAddressOrId]);

  function publishCollection() {
    const collection = collections.find(
      (collection) => collection.id === params.collectionAddressOrId
    );

    if (!collection) {
      return;
    }

    console.log({
      collection,
    });
  }

  if (!collection) {
    return null;
  }

  return (
    <>
      <header className="flex justify-between border-b">
        <div>
          <h2 className="font-bold text-xl">{collection.name}</h2>
          <p>{collection.description}</p>
          <p>Collection address</p>
        </div>

        <Image
          src={`${collection.base_image_path}/${collection.image_id}`}
          alt=""
          width={90}
          height={90}
          className="object-cover"
        />

        <div className="flex gap-2">
          <Button variant="outline" onClick={open}>
            Add Item
          </Button>
          <Button onClick={publishCollection}>Publish Collection</Button>
        </div>
      </header>

      <section>
        <h3 className="text-lg font-semibold">Items in store</h3>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
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
                <Table.Td>{item.description}</Table.Td>
                <Table.Td>{item.fiat_price}</Table.Td>
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

      <section>
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
      </section>

      <CreateItemModal
        onClose={close}
        opened={opened}
        collectionId={collection.id}
      />
    </>
  );
}
