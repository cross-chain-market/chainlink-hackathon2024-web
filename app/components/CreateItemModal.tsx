import {
  ActionIcon,
  Button,
  Modal,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface CreateItemModalProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateItemModal({ onClose, opened }: CreateItemModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      attributes: [{ key: "", data: "" }],
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create Item"
      size="xl"
      centered
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <TextInput label="Name" placeholder="Name of item" />

          <Textarea
            label="Description"
            placeholder="Short description for this item"
          />

          <NumberInput
            label="Price (USD)"
            placeholder="Price for a single listed item"
            hideControls
          />

          <NumberInput
            label="Total amount"
            placeholder="Total amount of items"
            hideControls
          />

          <NumberInput
            label="Listed amount"
            placeholder="Amount of items listed for sale"
            hideControls
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextInput label="Image ID in IPFS provider" placeholder="Image ID" />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-medium text-sm">Attributes</p>

              <ActionIcon
                variant="default"
                radius="xl"
                onClick={() =>
                  form.insertListItem("attributes", { key: "", name: "" })
                }
              >
                <IconPlus className="size-4" />
              </ActionIcon>
            </div>

            {form.getValues().attributes.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <TextInput
                  placeholder="Key"
                  key={form.key(`attributes.${index}.key`)}
                  {...form.getInputProps(`attributes.${index}.key`)}
                />
                <TextInput
                  placeholder="Value"
                  key={form.key(`attributes.${index}.data`)}
                  {...form.getInputProps(`attributes.${index}.data`)}
                />
                <ActionIcon
                  color="red"
                  radius="xl"
                  onClick={() => form.removeListItem("attributes", index)}
                >
                  <IconTrash className="size-4" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" fullWidth className="mt-4">
        Create
      </Button>
    </Modal>
  );
}
