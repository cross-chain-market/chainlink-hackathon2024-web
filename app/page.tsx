import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import { DeployedContractProvider } from "./clientProviders";

export default function Home() {
  return (
    <DeployedContractProvider>
      <main className="flex min-h-screen flex-col">
        <Header />
        <MainSection />
        <Footer />
      </main>
    </DeployedContractProvider>
  );
}
