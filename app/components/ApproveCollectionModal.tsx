import {
  Button,
  Modal,
  Text,
  Select,
  Space
} from "@mantine/core";
import { useState } from 'react';
import { z } from "zod";
import { useAccount } from "wagmi";
import { useForm } from "@mantine/form";
import { allowMarketplaceToSellCollection } from "@/app/lib/client-services/collectionContract";
import { useLocalCollections } from "@/app/hooks/useLocalCollections";
import { zodResolver } from "mantine-form-zod-resolver";
import { networkOptions, chainOptions, getMarketplaceAddress} from "../utils/helpers";

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
  const { chain } = useAccount();

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitDisabled(true);
    const marketPlaceAddress = getMarketplaceAddress(chain?.id);
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
      <form
        onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}
        className="flex flex-col gap-4"
      >
      {!isApproved && <Text>
        By approving this transaction you will allow marketplace on <span className="font-semibold">{chain?.name}</span> to sell collection products for collection <span className="font-semibold">{collectionAddress}</span>

      </Text>}
      {isApproved && <Text>By Revoking the approval for the marketplace to sell this collection, you will prevent buyers from buying products of this collection</Text>}
      <Space h="md" />
      
        <Button type="submit" disabled={isSubmitDisabled}>{isApproved ? 'Revoke' : 'Approve'}</Button>
      </form>
    </Modal>
  );
}
