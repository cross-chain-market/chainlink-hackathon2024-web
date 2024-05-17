"use client";

import { Container, Group, Burger, Title } from "@mantine/core";
import { useContext } from "react";
import { ContractContext } from "../../clientProviders";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";

import classes from "./Header.module.css";

import WalletConnectButton from "../WalletConnectButton";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  
  const { priceFeedInterface, collectionFactoryInterface } =
    useContext(ContractContext);

  const test = async () => {
    //const res = await priceFeedInterface.getAVAXUSD();
    debugger;
    const res = await collectionFactoryInterface.deployCollection('test-1-collection',[1,2,3], [100,300,400], 'QmekBgziAf5nChDnjvyMvtVLAyKU8t7qinLY8iumw1XLMG');
    debugger;
  }

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <div className="flex gap-2 items-center">
        <img
          src="https://cdn-icons-png.freepik.com/512/2152/2152349.png"
          style={{ width: 50, height: 50 }}
          className={"logo"}
        />{" "}
        <Title fz="lg" className={"text-dark"}>
          Cross-Chain Marketplace
        </Title>
        <Button onClick={test}>test</Button>

        </div>
       
        <Group gap={5} visibleFrom="xs">
          <WalletConnectButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
