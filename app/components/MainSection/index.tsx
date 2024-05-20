"use client";
import CollectionFactoryEventWatcher from "../../lib/client-services/collectionFactoryContract/CollectionFactoryEventWatcher";
import { watchEvents } from "../../lib/client-services/quicknode"
import { useDisclosure } from "@mantine/hooks";
import { Container } from "@mantine/core";
import Hero from "../Hero";
import { useEffect } from "react";

export default function MainSection() {
  useDisclosure(false);

  useEffect(() => {
    let listeners: any;
    async function startListeners() {
      listeners = await watchEvents();
    }

    startListeners();

    return () => {
      listeners.forEach((l: any) => {
        l();
      });
    }

  }, []);

  return (
    <>
      <CollectionFactoryEventWatcher />
      <Hero />
      <Container fluid className="flex flex-row"></Container>
    </>
  );
}
