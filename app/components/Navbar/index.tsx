import { Text, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { CreateCollectionModal } from "../CreateCollectionModal";

export function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <nav className="bg-white h-96 w-72 p-4 flex flex-col border-r border-gray-200">
        <div className="mb-4">
          <Group className="px-4 mb-2" justify="space-between">
            <Text className="text-gray-500 font-semibold">Collections</Text>
            <ActionIcon variant="default" radius="xl" onClick={open}>
              <IconPlus className="size-4" />
            </ActionIcon>
          </Group>
          <div className="px-2"></div>
        </div>
      </nav>

      <CreateCollectionModal onClose={close} opened={opened} />
    </>
  );
}
