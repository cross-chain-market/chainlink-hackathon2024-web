"use client";

import { DeployedContractProvider } from "@/app/clientProviders";
import Header from "@/app/components/Header";
import { Navbar } from "@/app/components/Navbar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();

  return (
    <DeployedContractProvider>
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
          {children}
        </AppShell.Main>
      </AppShell>
    </DeployedContractProvider>
  );
}
