"use client";

import { useDisclosure } from "@mantine/hooks";
import { Container } from "@mantine/core";
import { useEffect } from "react";
import Image from "next/image";

import CollectionFactoryEventWatcher from "../../lib/client-services/collectionFactoryContract/CollectionFactoryEventWatcher";
import { watchEvents } from "../../lib/client-services/quicknode";
import Hero from "../Hero";
import { Team } from "../Team";

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
    };
  }, []);

  return (
    <>
      <CollectionFactoryEventWatcher />
      <div className="flex flex-col gap-10">
        <Hero />

        <Container fluid className="flex flex-col gap-10">
          <h2 className="font-semibold text-3xl text-[#060326] uppercase text-center">
            Supported chains
          </h2>

          <div className="relative w-[1159px] h-32">
            <Image src="/supported-chains.png" alt="supported chains" fill />
          </div>
        </Container>

        <Container fluid className="flex flex-col gap-10">
          <h2 className="font-semibold text-3xl text-[#060326] uppercase text-center">
            Meet the team
          </h2>

          <Team />
        </Container>
      </div>
    </>
  );
}
