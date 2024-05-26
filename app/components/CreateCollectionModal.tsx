import { useEffect } from "react";
import { Modal, Select, TextInput, Textarea, Button } from "@mantine/core";
import { useLocalCollections } from "../hooks/useLocalCollections";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useRouter } from "next/navigation";

const createCollectionSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  description: z
    .string()
    .min(2, { message: "Description should have at least 2 letters" })
    .max(50, { message: "Description should have less then 20 letters" }),
  base_image_path: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  network_id: z
    .string(),
  chain_id: z
    .string()
});

interface CreateCollectionModalProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateCollectionModal({
  onClose,
  opened,
}: CreateCollectionModalProps) {
  const { createCollection } = useLocalCollections();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      base_image_path: "",
      network_id: "",
      chain_id: "",
    },
    validate: zodResolver(createCollectionSchema),
  });
  const router = useRouter();

  const handleSubmit = (values: typeof form.values) => {
    const createdCollection = createCollection(values);
    form.reset();
    onClose();
    router.push(`/seller/collections/${createdCollection.id}`);
  };

  const networkOptions = [
    { label: "Avalanche", value: "avalanche" },
    { label: "Polygon", value: "polygon" },
    { label: "Arbitrum", value: "arbitrum" },
    { label: "Optimism", value: "optimism" },
    { label: "Ethereum", value: "ethereum" }
  ];

  const chainOptions = [
    { label: "Avalanche-Fuji", value: "43113" },
    { label: "Polyogon-Amoy", value: "80002" },
    { label: "Arbitrum Sepolia", value: "421614" },
    { label: "Optimism Sepolia", value: "11155420" },
    { label: "Sepolia", value: "11155111" }
  ];

  const setChainValue = (selectedNetwork: string) => {
    selectedNetwork === "Avalanche" && form.setFieldValue('chain_id', "43113");
    selectedNetwork === "Polygon" && form.setFieldValue('chain_id', "80002");
    selectedNetwork === "Arbitrum" && form.setFieldValue('chain_id', "421614");
    selectedNetwork === "Optimism" && form.setFieldValue('chain_id', "11155420");
    selectedNetwork === "Ethereum" && form.setFieldValue('chain_id', "11155111");
  }

  const onCloseClick = () => {
    form.reset();
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onCloseClick} title="Create Collection (test networks)" centered>
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}
        className="flex flex-col gap-4"
      >
        <Select
          label="Network"
          placeholder="Pick value"
          data={networkOptions}
          clearable
          searchable
          onSearchChange={setChainValue}
          key={form.key("network_id")}
          {...form.getInputProps("network_id")}
        />

        <Select
          label="Chain"
          placeholder="Pick value"
          data={chainOptions}
          readOnly
          key={form.key("chain_id")}
          {...form.getInputProps("chain_id")}
        />

        <TextInput
          label="Name"
          placeholder="Name of collection"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Textarea
          label="Description"
          placeholder="Short description for this collection"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />

        <TextInput
          label="Base image path"
          placeholder="Base path to IPFS provider"
          key={form.key("base_image_path")}
          {...form.getInputProps("base_image_path")}
        />

        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
}
