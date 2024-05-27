import { useState } from 'react';
import {
  ActionIcon,
  Button,
  Modal,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { z } from "zod";
import Image from "next/image";
import { Text } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useLocalCollections } from "../hooks/useLocalCollections";

const createItemSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  description: z
    .string()
    .min(2, { message: "description should have at least 2 letters" }),
  image_id: z
    .number().nonnegative({ message: "id must be greater than or equal to 0" }),
  fiat_price: z.number().positive({ message: "Price must be greater than 0" }),
  total_amount: z.number().positive({ message: "Amount must be greater than 0" }),
  listed_amount: z.number().nonnegative({ message: "Listed amount must be greater than or equal to 0" }),
  attributes: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});

interface CreateItemModalProps {
  opened: boolean;
  onClose: () => void;
  collectionId: string;
  baseHash: string;
}

export function CreateItemModal({
  onClose,
  opened,
  collectionId,
  baseHash
}: CreateItemModalProps) {
  const { addItem } = useLocalCollections();
  const [imageId, setImageId] = useState(0);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      image_id: "0",
      fiat_price: "",
      total_amount: "",
      listed_amount: "",
      attributes: [],
    },
    onValuesChange: (values) => {
      console.log(values);
      setImageId(values.image_id);
    },
    validate: zodResolver(createItemSchema),
  });

  const values = form.getValues();

  const handleSubmit = (values: typeof form.values) => {
    addItem(collectionId, values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create Item"
      size="xl"
      centered
    >
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <div style={{ width: '100%', position: 'relative', top: '8px'}}>
              <NumberInput
                label="Image ID in IPFS provider"
                placeholder="Image ID"
                hideControls
                key={form.key("image_id")}
                {...form.getInputProps("image_id")}
              />
            </div>

            <TextInput
              label="Name"
              placeholder="Name of item"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <Textarea
              label="Description"
              placeholder="Short description for this item"
              key={form.key("description")}
              {...form.getInputProps("description")}
            />

            <NumberInput
              label="Price (USD)"
              placeholder="Price for a single listed item"
              hideControls
              key={form.key("fiat_price")}
              {...form.getInputProps("fiat_price")}
            />

            <NumberInput
              label="Total amount"
              placeholder="Total amount of items"
              hideControls
              key={form.key("total_amount")}
              {...form.getInputProps("total_amount")}
            />

            <NumberInput
              label="Listed amount"
              placeholder="Amount of items listed for sale"
              hideControls
              key={form.key("listed_amount")}
              {...form.getInputProps("listed_amount")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Text fw={500}>Image</Text>
            <div style={{ width: '100%', height: '262px', position: 'relative', paddingBottom: '2px', top: '-16px', border: 'solid black 1px' }}>
              {!!imageId && <Image
                src={`https://ipfs.io/ipfs/${baseHash}/${imageId}.png`}
                alt=""
                layout="fill"
                quality={100}
                className="object-cover"
              />}
            </div>
          </div>
          <div className="flex flex-col gap-4">
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
                      key={form.key(`attributes.${index}.value`)}
                      {...form.getInputProps(`attributes.${index}.value`)}
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
      </form>
    </Modal>
  );
}
