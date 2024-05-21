import { Title, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full h-56 bg-[#5B4CF0] mt-40 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center gap-8 p-4">
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center">
            <Image
              src="https://cdn-icons-png.freepik.com/512/2152/2152349.png"
              width={50}
              height={50}
              alt="cross chain marketplace logo"
            />

            <Title fz="lg" className="text-white">
              Cross-Chain Marketplace
            </Title>
          </div>

          <Link href="" className="text-white font-medium">
            Copyright
          </Link>

          <Link href="" className="text-white font-medium">
            About Team
          </Link>

          <Link href="" className="text-white font-medium">
            Github
          </Link>
        </div>

        <div className="flex justify-between items-center gap-8">
          <Button
            color="white"
            variant="outline"
            size="lg"
            rightSection={<IconChevronRight />}
          >
            Sell products
          </Button>

          <Button
            color="white"
            variant="outline"
            size="lg"
            rightSection={<IconChevronRight />}
          >
            Connect wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
