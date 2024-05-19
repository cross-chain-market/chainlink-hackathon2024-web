"use client";
import CollectionFactoryEventWatcher from "../../lib/client-services/collectionFactoryContract/CollectionFactoryEventWatcher";
import { useDisclosure } from "@mantine/hooks";
import { Container } from "@mantine/core";
import Hero from "../Hero";

export default function MainSection() {
  
  useDisclosure(false);
  return (
    <>
      <CollectionFactoryEventWatcher />
      <Hero />
      <Container fluid className="flex flex-row">
      </Container>
    </>
  );
}
