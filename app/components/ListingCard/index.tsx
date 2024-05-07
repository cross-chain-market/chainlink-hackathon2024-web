"use client";

import { Card, Text, Button } from "@mantine/core";
import Image from "next/image";
import { priceFormatter } from "@/app/utils/helpers";

interface ListingCardProps {
  name: string;
  price: number;
  image: string;
}

export default function ListingCard({ image, name, price }: ListingCardProps) {
  return (
    <Card withBorder className="gap-2 group">
      <Card.Section className="relative">
        <Image
          src={image}
          alt="Listing image"
          height={160}
          width={160}
          className="object-cover w-40 h-40"
        />
      </Card.Section>

      <Text fz="sm" className="font-bold">
        {name}
      </Text>

      <Text c="dimmed" fz="xs">
        Price {priceFormatter.format(price)}
      </Text>

      <Card.Section>
        <Button className="invisible group-hover:visible" fullWidth>
          Buy
        </Button>
      </Card.Section>
    </Card>
  );
}
