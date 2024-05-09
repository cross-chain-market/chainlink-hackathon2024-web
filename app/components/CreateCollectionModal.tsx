import { Modal, Select, TextInput, Textarea, Button } from "@mantine/core";

interface CreateCollectionModalProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateCollectionModal({
  onClose,
  opened,
}: CreateCollectionModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Create Collection" centered>
      <div className="flex flex-col gap-4">
        <Select
          label="Network"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
        />

        <Select
          label="Chain"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
        />

        <TextInput label="Name" placeholder="Name of collection" />

        <Textarea
          label="Description"
          placeholder="Short description for this collection"
        />

        <TextInput
          label="Base image path"
          placeholder="Base path to IPFS provider"
        />

        <Button type="submit">Create</Button>
      </div>
    </Modal>
  );
}
