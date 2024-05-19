import { useWatchContractEvent } from "wagmi";
import { getChainId } from "@wagmi/core";
import { chainInfo } from "../../../utils/helpers";
import { config } from '../../../../config'

import { Address } from "viem";
const contractJSON = require("./abi.json");

interface ContractAddresses {
  [key: string]: string;
}
// work in progress
export default function CollectionFactoryEventWatcher() {
  const chainId = getChainId(config);
  const chainData: any = chainInfo(chainId);
  const contractAddress: ContractAddresses = {
    Localhost_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Development_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Preview_avalanche_fuji:
      process.env.collectionsFactory_avalanche_fuji_contract_address || "",
    Production: "",
  };

  useWatchContractEvent({
    abi: contractJSON.abi,
    address: contractAddress[
      `${process.env.WORKING_ENV}_${chainData.chain}` || "test"
    ] as Address,
    eventName: "CollectionDeployedLog",
    onLogs(logs) {
      console.log("New logs!", logs);
      if (logs && logs[0]) {
        alert(`collection created: ${(logs[0] as any).args.collectionAddress}`);
      }
    },
  });

  return <></>;
}
