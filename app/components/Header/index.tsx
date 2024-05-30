"use client";

import { Container, Group, Burger, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import classes from "./Header.module.css";

import ConnectButton from "../WalletConnect";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  return (
    <header className={classes.header}>
      <Container px={90} fluid className={classes.inner}>
        <div className="flex gap-2 items-center">
        <button onClick={() => router.push("/")} className={'flex gap-2 items-center m-r-3'}>
        <Link href="/">
          <Image src="/logo.svg" alt="Merado logo" width={160} height={90} />
        </Link>
        <Title fz="lg" className={"text-dark"}>
          Cross-Chain Marketplace
        </Title>
          </button>
        </div>

        <Group gap={5} visibleFrom="xs">
          <ConnectButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
