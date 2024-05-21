import { Footer } from "./components/Footer";
import MainSection from "./components/MainSection";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomeHeader />
      <MainSection />
      <Footer />
    </main>
  );
}
