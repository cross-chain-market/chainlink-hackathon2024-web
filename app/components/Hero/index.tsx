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
              <div className="mt-8 flex justify-center lg:justify-start">
                <a
                  href="#!"
                  className="inline-block bg-[#b9ccff] rounded-lg py-3 px-6 text-sm md:text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b9ccff] transition duration-300"
                >
                  Get Started
                </a>
                <a
                  href="#!"
                  className="ml-4 inline-block bg-black rounded-lg py-3 px-6 text-sm md:text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition duration-300"
                >
                  Learn More
                </a>
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
