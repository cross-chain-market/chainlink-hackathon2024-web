import {
  Button,
  Modal,
  Text,
  Select,
  Space
} from "@mantine/core";
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "@mantine/form";
import { allowMarketplaceToSellCollection } from "@/app/lib/client-services/collectionContract";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import { zodResolver } from "mantine-form-zod-resolver";
import { networkOptions, chainOptions} from "../utils/helpers";

const createItemSchema = z.object({
  network_id: z
    .string(),
  chain_id: z
    .string()
});

interface CreateItemModalProps {
  opened: boolean;
  onClose: () => void;
  collectionAddress: string;
  collectionId: string;
  isApproved: boolean;
}

export function ApproveCollectionModal({
  onClose,
  opened,
  collectionAddress,
  collectionId,
  isApproved
}: CreateItemModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
        network_id: "",
        chain_id: "",
    },
    validate: zodResolver(createItemSchema),
  });
  const { updateCollectionSaleApproval } = useLocalCollections();
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const getMarketplaceAddress = (selectedChainId: string): string => {
    //avalanche Fuji
    if(selectedChainId === '43113') {
      return '0xb65eFBCb305f8c5Fb13ec3A7c2b1658046E8290d';
    }

    // polygon Amoy
    if (selectedChainId === '43113') {
      return '0x1866380708C7EeC51C8557E40ba98ECe37f61dF0';
    }

    return '0x0';
  }

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitDisabled(true);
    const marketPlaceAddress = getMarketplaceAddress(values.chain_id);
    if (collectionAddress && collectionId) {
      try {
        await allowMarketplaceToSellCollection(collectionAddress, marketPlaceAddress, !isApproved);
        updateCollectionSaleApproval(collectionId, !isApproved);
      } catch (err) {
        console.log(err);
      }
    }
    form.reset();
    setSubmitDisabled(false);
    onClose();
  };

  const setChainValue = (selectedNetwork: string) => {
    selectedNetwork === "Avalanche" && form.setFieldValue('chain_id', "43113");
    selectedNetwork === "Polygon" && form.setFieldValue('chain_id', "80002");
    selectedNetwork === "Arbitrum" && form.setFieldValue('chain_id', "421614");
    selectedNetwork === "Optimism" && form.setFieldValue('chain_id', "11155420");
    selectedNetwork === "Ethereum" && form.setFieldValue('chain_id', "11155111");
  }

  const onCloseClick = () => {
    form.reset();
    setSubmitDisabled(false);
    onClose();
  }

  return (
    <Modal
      opened={opened}
      onClose={onCloseClick}
      title="Approve Marketplace to sell your products"
      size="md"
      centered
    >
      {!isApproved && <Text>By approving this transaction you will allow the marketplace to sell collection products for you</Text>}
      {isApproved && <Text>By Revoking the approval for the marketplace to sell this collection, you will prevent buyers from buying products of this collection</Text>}
      <Space h="md" />
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
        <Button type="submit" disabled={isSubmitDisabled}>{isApproved ? 'Revoke' : 'Approve'}</Button>
      </form>
    </Modal>
  );
}
