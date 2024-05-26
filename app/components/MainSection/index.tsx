"use client";

import { useDisclosure } from "@mantine/hooks";
import { Container } from "@mantine/core";
import Image from "next/image";

import Hero from "../Hero";
import { Team } from "../Team";

export default function MainSection() {
  useDisclosure(false);

  return (
    <>
      <div className="flex flex-col gap-10">
        <Hero />

        <Container fluid className="flex flex-col gap-10 items-center">
          <div className="border-b-[12px] border-b-[#5B4CF0] w-fit">
            <h2 className="-mb-4 font-semibold text-3xl text-[#060326] uppercase text-center">
              Supported chains
            </h2>
          </div>

          <div className="relative w-[1159px] h-32">
            <Image src="/supported-chains.png" alt="supported chains" fill />
          </div>
        </Container>

        <Container
          fluid
          className="flex flex-col gap-10 items-center"
          id="team"
        >
          <div className="border-b-[12px] border-b-[#5B4CF0] w-fit">
            <h2 className="-mb-4 font-semibold text-3xl text-[#060326] uppercase text-center">
              Meet the team
            </h2>
          </div>

          <Team />
        </Container>
      </div>
    </>
  );
}
