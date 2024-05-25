"use client";

import { Title, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const { open } = useWeb3Modal();

  return (
    <div className="w-full h-56 bg-[#5B4CF0] mt-40 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center gap-8 p-4">
        <div className="flex gap-8 items-center">
          <Link className="flex gap-2 items-center" href="/">
            <Image
              src="https://cdn-icons-png.freepik.com/512/2152/2152349.png"
              width={50}
              height={50}
              alt="cross chain marketplace logo"
            />

            <Title fz="lg" className="text-white">
              Cross-Chain Marketplace
            </Title>
          </Link>

          <Link href="" className="text-white font-medium">
            Copyright
          </Link>

          <Link href="#team" className="text-white font-medium">
            About Team
          </Link>

          <a
            href="https://github.com/cross-chain-market"
            className="text-white font-medium"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>

        <div className="flex justify-between items-center gap-8">
          <Button
            type="button"
            color="white"
            variant="outline"
            size="lg"
            rightSection={<IconChevronRight />}
            onClick={() => router.push("/marketplace")}
          >
            Sell products
          </Button>

          <Button
            type="button"
            color="white"
            variant="outline"
            size="lg"
            rightSection={<IconChevronRight />}
            onClick={() => open()}
          >
            Connect wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
