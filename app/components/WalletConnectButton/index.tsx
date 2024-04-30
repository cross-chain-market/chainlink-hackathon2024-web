"use client";

import { useContext } from "react";
import { ContractContext } from "../../clientProviders";
import { shortAddress } from "../../utils/helpers";
import { Button } from "@mantine/core";

export default function WalletConnectButton() {
  const { connectedAccount, connect } =
    useContext(ContractContext);
  const buttonText = connectedAccount
    ? shortAddress(connectedAccount)
    : "Connect Wallet";

  return (
    <Button
      variant="gradient"
      gradient={{ from: "orange", to: "red", deg: 45 }}
      className="hover:opacity-90"
      onClick={connect}
    >
      {buttonText}
    </Button>
  );
}
