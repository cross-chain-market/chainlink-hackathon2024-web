"use client";
import Hero from "../Hero";
import { useDisclosure } from "@mantine/hooks";
import { Container } from "@mantine/core";

export default function MainSection() {
  useDisclosure(false);
  return (
    <>
      <Hero />
      <Container fluid className="flex flex-row">
      </Container>
    </>
  );
}
