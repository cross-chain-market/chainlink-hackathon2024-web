import { Alert, Button, Container } from "@mantine/core";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col">
        <Header />
        <Container className="flex flex-col gap-2">
          <Alert variant="light" color="yellow" radius="xs">
            Hey, we are so glad to have you on our site. In order to buy, please
            verify your identify with our KYC provider
            <Button variant="outline" color="orange" className="ml-2">
              Verify
            </Button>
          </Alert>

          <Container className="w-full flex gap-2 px-0">
            <ListingCard
              name="Listing 1"
              price={100}
              image="https://images.unsplash.com/photo-1714718086623-387c78e0e328?q=80&w=160&auto=format&fit=crop"
            />
            <ListingCard
              name="Listing 2"
              price={100}
              image="https://images.unsplash.com/photo-1714652232925-182c8cb2b3fc?q=80&w=160&auto=format&fit=crop"
            />
            <ListingCard
              name="Listing 3"
              price={100}
              image="https://images.unsplash.com/photo-1714042104644-66d6095c5deb?q=80&w=160&auto=format&fit=crop"
            />
          </Container>
        </Container>
        <Footer />
      </main>
  );
}
