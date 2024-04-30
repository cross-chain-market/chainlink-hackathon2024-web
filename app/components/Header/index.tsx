"use client";

import { Container, Group, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

import WalletConnectButton from "../WalletConnectButton";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  
  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Title fz="lg" className={"text-white"}>
          Cross-Chain Marketplace (Real World Assets)
        </Title>

        <Group gap={5} visibleFrom="xs">
          <WalletConnectButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
