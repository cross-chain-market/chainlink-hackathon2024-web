import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Tal Waserman",
    title: "Snr Full stack & Web3 developer",
    stack: "JavaScript, TypeScript, Go, React and Node",
    image: "/team-1.png",
  },
  {
    name: "Wisdom Umanah",
    title: "Product Designer",
    stack: "User experience, user interface, Prototyping",
    image: "/team-2.png",
  },
  {
    name: "Maxi Paz",
    title: "Backend Developer",
    stack: "Offchain with Golang",
    image: "/team-3.png",
  },
  {
    name: "Diego Sano",
    title: "Full Stack Developer",
    stack: "JavaScript, TypeScript, Go, React and Node",
    image: "/team-4.png",
  },
  {
    name: "Simon Ayo",
    title: "Frontend / Blockchain Engineer",
    stack: "Typescript, Angular, React, Node js, Solidity",
    image: "/team-5.png",
  },
];

export function Team() {
  return (
    <div className="flex gap-4 justify-between items-center flex-wrap">
      {TEAM_MEMBERS.map((member) => (
        <div
          className="w-[301px] h-[492px] flex flex-col group"
          key={member.name}
        >
          <div className="w-[301px] h-[405px] relative bg-gradient-to-br from-[#CD69D6] -from-[18.27%] via-[#965AE3] via-[39.87%] to-[#5B4CF0] to-[94.52%]">
            <Image
              alt="team profile picture"
              src={member.image}
              className="grayscale group-hover:grayscale-0 object-cover"
              fill
            />

            <p className="absolute left-4 bottom-4 text-xl text-white invisible group-hover:visible">
              {member.stack}
            </p>
          </div>

          <div>
            <p className="font-bold text-2xl text-[#060326]">{member.name}</p>
            <p className="text-base text-[#606060]">{member.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
