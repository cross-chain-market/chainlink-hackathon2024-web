"use client";

import { Container, Group, Burger, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { deployCollection } from '../../lib/client-services/collectionFactoryContract';
import { buyListing } from '../../lib/client-services/marketplaceContract';
import { getAVAXUSD } from '../../lib/client-services/priceFeedContract';
import { allowMarketplaceToSellCollection } from "../../lib/client-services/collectionContract";

import classes from "./Header.module.css";

import ConnectButton from "../WalletConnect";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const deployCollectionClick = async () => {
    await deployCollection(
      "test-collection-5",
      [1, 2, 3],
      [500, 600, 700],
      "QmekBgziAf5nChDnjvyMvtVLAyKU8t7qinLY8iumw1XLMG"
    );
  };

  const allowMarketplaceToSellCollectionClick = async () => {
    await allowMarketplaceToSellCollection('0x417a5298c5Cc9A6935aC1bF37633d3DBB8a4C95c', '0x33D0555cCeaA36fcCDb3Ddc33243538A6FB8C02F', true);
  };

  const auxToUsdBtn = async () => {
    const res = await getAVAXUSD();
    if (res) {
      alert(`300$ -> ${(300 / res).toFixed(2)} AVAX`);
    }
  }

  const buyListingBtn = async () => {
    await buyListing("0x417a5298c5Cc9A6935aC1bF37633d3DBB8a4C95c", 2, 10, 5);
  };

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
        {/* <DeployCollectionButton/> */}
        <Button onClick={deployCollectionClick}>add collection</Button>
        <Button onClick={allowMarketplaceToSellCollectionClick}>approve marketplace to sell</Button>
        <Button onClick={auxToUsdBtn}>get AUX to usd</Button>
        <Button onClick={buyListingBtn}>buy listing</Button>
        </div>
       
        <Group gap={5} visibleFrom="xs">
          <ConnectButton />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
