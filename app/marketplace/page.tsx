import { Alert, Button, Container } from "@mantine/core";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { DeployedContractProvider } from "../clientProviders";
import ListingCard from "../components/ListingCard";
import classes from "./Marketplace.module.css";
import woman1 from "../assets/woman-h-1.svg";
export default function Home() {
  return (
    <DeployedContractProvider>
      <main
        className="flex flex-col"
        style={{ minHeight: "150vh", position: "relative" }}
      >
        <Header />
        <div className={classes.info_alert}>
          <div>
            <p className={classes.alert_text}>
              🎉 Hey, we are do glad to have you on our site. In order to buy
              please verify your identity with our KYC provider
            </p>
          </div>
          <div>
            <button className={classes.verify_now}>Verify now</button>
          </div>
        </div>
        {/* <Container className="flex flex-col gap-2"> */}
        {/* <Alert variant="light" color="yellow" radius="xs">
            Hey, we are so glad to have you on our site. In order to buy, please
            verify your identify with our KYC provider
            <Button variant="outline" color="orange" className="ml-2">
              Verify
            </Button>
          </Alert> */}

        {/* <Container className="w-full flex gap-2 px-0">
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
          </Container> */}
        {/* </Container> */}
        <Container px={90} fluid style={{ width: "100%" }}>
          <div className={classes.banner}>
            <div className="flex">
              <div>
                <p className={classes.title}>Market Place</p>
              </div>
              <div>
                <img
                  src={"./assets/woman-h-1.svg"}
                  alt=""
                  className={classes.img1}
                />
              </div>
            </div>
            <div>
              <img
                src={"./assets/woman-h.svg"}
                alt=""
                className={classes.img2}
              />
            </div>
          </div>

          <div className="mt-5">
            <p className={classes.listing}>Listing</p>

            <div className="flex flex-wrap">
              <div className="lg:w-3/12 w-full mt-4">
                <div className={classes.list_card}>
                  <div
                    className={classes.product_img}
                    style={{ background: "url(./assets/product-img.svg)" }}
                  >
                    <img
                      src="./assets/avalanche-logo.svg"
                      className="p-2"
                      alt=""
                    />
                  </div>
                  <div className={classes.desc}>
                    <div>
                      {" "}
                      <p>Brown leather coat Brown leather coat</p>
                    </div>
                    <div>
                      {" "}
                      <p className={classes.price}>$300</p>
                    </div>{" "}
                  </div>

                  <div>
                    <button className={classes.buy_btn}>Buy now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className={classes.overlay}></div>
        <div className={classes.product_details}>
          <div className={classes.product_details_con}>
            <div
              className={classes.product_details_img}
              style={{ backgroundImage: "url(./assets/woman.svg)" }}
            ></div>
            <div>
              <div className={classes.title}>
                Brown leather coat Brown leather coat
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </DeployedContractProvider>
  );
}
