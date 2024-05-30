"use client";

import { Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 text-center lg:text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="lg:w-7/12 lg:pr-6">
              <h1 className="text-[40px] font-bold text-black">
                Crypto products,
                <br /> Your Gateway to the <br />
                <span className="text-white bg-[#5B4CF0]">
                  Future of Shopping
                </span>
              </h1>

              <p className="text-xl mt-4 font-medium text-[#606060] leading-8">
                Welcome to our Web3 Marketplace, We enable selling real-world
                products with a few clicks. Our platform enables users to
                securely transact with cryptocurrencies while offering a diverse
                range of products. From electronics to fashion, art, and more,
                discover a seamless shopping experience that prioritizes
                security, transparency, and convenience. Join us in shaping the
                future of commerce.
              </p>

              <div className="mt-8 flex gap-3 justify-center lg:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  rightSection={<IconChevronRight />}
                  onClick={() => router.push("/seller/collections")}
                  color="#5B4CF0"
                >
                  Sell products
                </Button>

                <Button
                  type="button"
                  variant="filled"
                  size="lg"
                  rightSection={<IconChevronRight />}
                  onClick={() => router.push("/marketplace")}
                  color="#5B4CF0"
                >
                  Go to marketplace
                </Button>
              </div>
            </div>

            <Image
              src="/hero-banner.png"
              className="object-cover"
              alt="Cross-Chain Security"
              width={742}
              height={602}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
