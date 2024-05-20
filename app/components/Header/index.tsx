"use client";

import { Container, Group, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

import WalletConnectButton from "../WalletConnectButton";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container px={90} fluid className={classes.inner}>
        <div className="flex gap-2 items-center">
          <img
            src="https://cdn-icons-png.freepik.com/512/2152/2152349.png"
            style={{ width: 50, height: 50 }}
            className={"logo"}
          />{" "}
          <Title fz="lg" className={"text-dark"}>
            Cross-Chain Marketplace
          </Title>
        </div>

        <Group gap={5} visibleFrom="xs">
          <WalletConnectButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
