"use client";
import { createContext, useEffect, useState } from "react";
import ContractInterface from "./lib/client-services/contractA";
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
  const [contractInterface, setInterface] = useState<any>();
  const [initialized, setInitialized] = useState<boolean>();
  const [connectedAccount, setAccount] = useState<string | null>();

  const connect = async () => {
    if (!connectedAccount) {
      const account = await connectWallet();
      if (account) {
        setAccount(account.address);
        initializeContract();
      }
    }
  };

  const initializeContract = async () => {
    const contractInterface = new ContractInterface();
    await contractInterface.init();
    setInitialized(true);
    setInterface(contractInterface);
    (window as any).ethereum.on(
      "accountsChanged",
      async (accounts: Array<string>) => {
        if (accounts.length === 0) {
          setAccount(null);
          setInitialized(false);
        } else {
            await contractInterface.init();
            setAccount(contractInterface.getSignerAddress());
        }
      }
    );
  };

  useEffect(() => {
    const getConnected = async () => {
      const connectedAccount = await getCurrentWalletConnected();
      if (connectedAccount?.address) {
        setAccount(connectedAccount.address);
        initializeContract();
      }
    };
    getConnected();
  }, []);

  return (
    <ContractContext.Provider
      value={{ contractInterface, initialized, connectedAccount, connect }}
    >
      {children}
    </ContractContext.Provider>
  );
}
