import { Button } from "@mantine/core";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 text-center lg:text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-7/12 lg:pr-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-black">
                Cross-Chain Marketplace{" "}
                <span className="text-[#b6e3ff]">For Assets</span>
              </h1>
              <p className="mt-4 text-lg text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <div className="mt-8 flex gap-3 justify-center lg:justify-start">
                <Button variant="filled">Go to marketplace</Button>

                <Button variant="light">Create your first collection</Button>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-5/12">
              <img
                src="https://aktarytech.com/wp-content/uploads/2022/03/cross-chain-security.jpg"
                className="w-full rounded-lg shadow-lg"
                alt="Cross-Chain Security"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
