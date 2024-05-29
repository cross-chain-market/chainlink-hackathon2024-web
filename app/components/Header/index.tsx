"use client";

import { Container, Group, Burger, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import classes from "./Header.module.css";

import ConnectButton from "../WalletConnect";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();


  const auxToUsdBtn = async () => {
    const res = await getAVAXUSD();
    if (res) {
      alert(`300$ -> ${(300 / res).toFixed(2)} AVAX`);
    }
  }

  // const buyListingBtn = async () => {
  //   await buyListing("0x417a5298c5Cc9A6935aC1bF37633d3DBB8a4C95c", 2, 10, 5);
  // };

  return (
    <header className={classes.header}>
      <Container px={90} fluid className={classes.inner}>
        <div className="flex gap-2 items-center">
          <button onClick={() => router.push("/")} className={'flex gap-2 items-center m-r-3'}>
          <img
          src="https://cdn-icons-png.freepik.com/512/2152/2152349.png"
          style={{ width: 50, height: 50, cursor: 'pointer' }}
          className={"logo"}
        />{" "}
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
