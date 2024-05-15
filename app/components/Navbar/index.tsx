import { Text, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { CreateCollectionModal } from "../CreateCollectionModal";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import Link from "next/link";

export function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { collections } = useLocalCollections();

  return (
    <>
      <nav className="bg-white h-96 w-72 p-4 flex flex-col border-r border-gray-200">
        <div className="mb-4">
          <Group className="px-2 mb-2" justify="space-between">
            <Text className="text-gray-500 font-semibold">Collections</Text>
            <ActionIcon variant="default" radius="xl" onClick={open}>
              <IconPlus className="size-4" />
            </ActionIcon>
          </Group>

          <div className="px-2 flex gap-2 flex-col">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/seller/collections/${collection.id}`}
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <CreateCollectionModal onClose={close} opened={opened} />
    </>
  );
}
