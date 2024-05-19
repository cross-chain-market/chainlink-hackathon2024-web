"use client";
import Hero from "../Hero";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { ContractContext } from "@/app/clientProviders";

export default function MainSection() {
  const [contractWebSocket, setContractWebSocket] = useState<any>();
  useDisclosure(false);
  const { contractInterface, initialized } = useContext(ContractContext);

  useEffect(() => {
    const wsListener = (event: any) => {
      console.log("event: ", event.log.args);
    };

    if (initialized && !contractWebSocket) {
      const contractWebSocket = contractInterface.getWebSocket();
      setContractWebSocket(contractWebSocket);
      contractWebSocket.on("*", wsListener);
    }
    return () => contractWebSocket && contractWebSocket.off("*", wsListener);
  }, [initialized, contractInterface, contractWebSocket]);

  return (
    <>
      <Hero />
      <Container fluid className="flex flex-row"></Container>
    </>
  );
}
