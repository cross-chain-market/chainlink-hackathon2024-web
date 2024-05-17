"use client";
import { createContext, useEffect, useState } from "react";
import MarketplaceInterface from "./lib/client-services/marketplaceContract";
import CollectionFactoryInterface from "./lib/client-services/collectionFactoryContract";
import PriceFeedInterface from "./lib/client-services/priceFeedContract";
import BaseInterface from "./lib/client-services/BaseInterface";
import {
  getCurrentWalletConnected,
  connectWallet,
} from "./lib/client-services/walletConnection";

export const ContractContext = createContext<any>({});

export function DeployedContractProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [marketplaceInterface, setMarketplaceInterface] = useState<any>();
  const [collectionFactoryInterface, setCollectionFactoryInterface] = useState<any>();
  const [priceFeedInterface, setPriceFeedInterface] = useState<any>();
  const [baseInterface, setBaseInterface] = useState<any>();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [connectedAccount, setAccount] = useState<string | null>();

  const connect = async () => {
    if (!connectedAccount) {
      const account = await connectWallet();
      if (account && !baseInterface) {
        setAccount(account.address);
        initializeContracts();
      }
    }
  };

  const initializeContracts = async () => {
    const baseInterface = new BaseInterface();
    setBaseInterface(baseInterface);
    await baseInterface.init();
    const chainId = baseInterface.getChainId();
    const signer = baseInterface.getSigner();

    const marketPlaceContract = new MarketplaceInterface();
    await marketPlaceContract.init(chainId, signer);
    setMarketplaceInterface(marketPlaceContract);

    const priceFeedInterface = new PriceFeedInterface();
    await priceFeedInterface.init(chainId, signer);
    setPriceFeedInterface(priceFeedInterface);

    const collectionFactoryInterface = new CollectionFactoryInterface();
    await collectionFactoryInterface.init(chainId, signer);
    setCollectionFactoryInterface(collectionFactoryInterface);

    setInitialized(true);
    (window as any).ethereum.on(
      "accountsChanged",
      async (accounts: Array<string>) => {
        if (accounts.length === 0) {
          setAccount(null);
          setInitialized(false);
        } else {
            await marketPlaceContract.init(chainId, signer);
            setAccount(baseInterface.getSigner());
        }
      }
    );
  };

  useEffect(() => {
    const getConnected = async () => {
      const connectedAccount = await getCurrentWalletConnected();
      if (connectedAccount?.address && !initialized) {
        setAccount(connectedAccount.address);
        initializeContracts();
      }
    };
    getConnected();
  }, []);

  return (
    <ContractContext.Provider
      value={{ marketplaceInterface, collectionFactoryInterface, priceFeedInterface, initialized, connectedAccount, connect }}
    >
      {children}
    </ContractContext.Provider>
  );
}
