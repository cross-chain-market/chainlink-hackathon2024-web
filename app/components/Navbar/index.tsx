import { Text, Group, ActionIcon, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { CreateCollectionModal } from "../CreateCollectionModal";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import Link from "next/link";

export function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { collections } = useLocalCollections();
  const router = useRouter();

  return (
    <>
      <nav className="bg-white h-96 w-72 p-4 flex flex-col border-r border-gray-200 h-full">
        <div className="mb-4">
          <Group className="px-2 mb-2" justify="space-between">
            <Text className="text-gray-500 font-semibold">Collections</Text>
            <ActionIcon variant="default" radius="xl" onClick={open}>
              <IconPlus className="size-4" />
            </ActionIcon>
          </Group>

          <List className="px-2 flex gap-2 flex-col">
            {collections.map((collection) => (
              <List.Item className='cursor-pointer hover:bg-gray-200' key={collection.id} onClick={() => router.push(`/seller/collections/${collection.id}`)}> 
              {collection.name}
            </List.Item>
             
            ))}
          </List>
        </div>
      </nav>

      <CreateCollectionModal onClose={close} opened={opened} />
    </>
  );
}
