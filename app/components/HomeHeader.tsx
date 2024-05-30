import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="w-full h-20 bg-[#5B4CF0] flex items-center justify-center">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/logo-light.svg"
          width={160}
          height={90}
          alt="Merado logo"
        />
      </Link>
    </header>
  );
}
