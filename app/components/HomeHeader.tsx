import { Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="w-full h-20 bg-[#5B4CF0] flex items-center justify-center">
      <Link href="/" className="flex gap-2 items-center">
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
    </header>
  );
}
