"use client";

import { DeployedContractProvider } from "@/app/clientProviders";
import Header from "@/app/components/Header";
import { Navbar } from "@/app/components/Navbar";
import { AppShell, Button, Table, TableData } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateItemModal } from "@/app/components/CreateItemModal";

const itemsData: TableData = {
  head: [
    "ID",
    "Name",
    "Description",
    "Price",
    "Total Amount",
    "Listed Amount",
    "Attributes",
    "Actions",
  ],
  body: [
    [1, "Josie Adams", "", 100, 10, 9, "a, b, c", "..."],
    [2, "Josie Adams", "", 100, 10, 9, "a, b, c", "..."],
    [3, "Josie Adams", "", 100, 10, 9, "a, b, c", "..."],
    [4, "Josie Adams", "", 100, 10, 9, "a, b, c", "..."],
  ],
};

const transactionsData: TableData = {
  head: [
    "ID",
    "TX Hash",
    "Shipment ID",
    "Status",
    "Buyer Account",
    "Buyer Chain",
    "Buyer Network",
    "Seller Network",
    "Seller Chain",
    "Seller Account",
  ],
  body: [
    [
      1,
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "cd66248b-94e3-53d2-9b73-4ea1b36f5b84",
      "Awaiting",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "Sepolia",
      "Ethereum",
      "Ethereum",
      "Polygon",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ],
    [
      2,
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "144512f3-a29e-5051-ac72-1e0ab5b48285",
      "Canceled",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "Sepolia",
      "Ethereum",
      "Ethereum",
      "Polygon",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ],
    [
      3,
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "d0a1f70b-a4bf-5ea4-a711-2573d76c386e",
      "Awaiting",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "Sepolia",
      "Ethereum",
      "Ethereum",
      "Polygon",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ],
    [
      4,
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "e3bc573a-d18e-5932-bee7-1da22f4372ec",
      "Finished",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "Sepolia",
      "Ethereum",
      "Ethereum",
      "Polygon",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ],
    [
      5,
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "846fc745-cf12-540c-9133-0418b4052fd3",
      "Awaiting",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      "Sepolia",
      "Ethereum",
      "Ethereum",
      "Polygon",
      "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    ],
  ],
};

export default function Page() {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DeployedContractProvider>
      <>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !navbarOpened },
          }}
          padding="md"
        >
          <AppShell.Header withBorder={false}>
            <Header />
          </AppShell.Header>

          <AppShell.Navbar withBorder={false}>
            <Navbar />
          </AppShell.Navbar>

          <AppShell.Main className="flex flex-col gap-4">
            <header className="flex justify-between border-b">
              <div>
                <h2 className="font-bold text-xl">Collection Name</h2>
                <p>Collection description</p>
                <p>Collection address</p>
              </div>

              <img alt="" />

              <div className="flex gap-2">
                <Button variant="outline" onClick={open}>
                  Add Item
                </Button>
                <Button>Publish Collection</Button>
              </div>
            </header>

            <section>
              <h3 className="text-lg font-semibold">Items in store</h3>

              <Table data={itemsData} />
            </section>

            <section>
              <h3 className="text-lg font-semibold">Transactions</h3>

              <Table.ScrollContainer minWidth={500}>
                <Table data={transactionsData} />
              </Table.ScrollContainer>
            </section>
          </AppShell.Main>
        </AppShell>

        <CreateItemModal onClose={close} opened={opened} />
      </>
    </DeployedContractProvider>
  );
}
