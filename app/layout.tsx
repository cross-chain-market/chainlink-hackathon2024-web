import type { Metadata } from "next";
import { headers } from 'next/headers'
import { Inter } from "next/font/google";
import { Providers } from "./MantineProviders";
import NotificationProvider from "./NotificationProvider";
import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "./globals.css";
import "@mantine/dates/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Marketplace",
  description: "Buy & Sell cross-chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Web3ModalProvider initialState={initialState}>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </Web3ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
