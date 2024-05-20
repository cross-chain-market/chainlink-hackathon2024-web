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
    .min(2, { message: "Name should have at least 2 letters" }),
  base_image_path: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  image_id: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  network_id: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  chain_id: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
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
      image_id: "",
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

  return (
    <Modal opened={opened} onClose={onClose} title="Create Collection" centered>
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}
        className="flex flex-col gap-4"
      >
        <Select
          label="Network"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
          key={form.key("network_id")}
          {...form.getInputProps("network_id")}
        />

        <Select
          label="Chain"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
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

        <TextInput
          label="Image ID"
          placeholder="ID of the image"
          key={form.key("image_id")}
          {...form.getInputProps("image_id")}
        />

        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
}
