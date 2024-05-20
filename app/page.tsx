import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <MainSection />
      <Footer />
    </main>
  );
}
