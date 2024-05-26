"use client";
import { Container } from "@mantine/core";

import Header from "../components/Header";
// import Footer from "../components/Footer";
import classes from "./Marketplace.module.css";
import { useEffect, useState } from "react";
import { Product } from "../types/marketplace";
import { buyItem, getAllListing } from "../lib/services/items/service";
import { getAVAXUSD } from "../lib/client-services/priceFeedContract";
import { useAccount } from "wagmi";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const [selectedProduct, setSelectedProducts] = useState<Product | null>(null);
  const [item_amount, setItem_amount] = useState<number>(1);
  const [avaxInUSD, setAvaxInUsd] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const { address, chain } = useAccount();

  useEffect(() => {
    console.log(chain, "chain");
    const getPriceAndListings = async () => {
      const price = await getAVAXUSD();
      console.log(price, "price");
      const listings = await getAllListing();
      listings?.forEach((listing) => {
        (listing.shipping = 13), (listing.platform_fee = 2);
        // listing.network_id = "avalanche_fuji";
      });
      setAvaxInUsd(price || 0);
      setProducts(listings || []);
    };
    getPriceAndListings();
  }, []);

  const viewProductDetails = (product: Product) => {
    setSelectedProducts(product);
    handleTotalAmount(product, item_amount);
    setIsModalOpen((prev) => !prev);
  };

  const handleTotalAmount = (product: Product, item_amount: number) => {
    setAmount(
      item_amount *
        (product.fiat_price +
          product.shipping +
          product.fiat_price * (product.platform_fee / 100))
    );
  };

  const handleAmountOfItem = async (type: "-" | "+") => {
    if (!selectedProduct) {
      return;
    }
    const price = await getAVAXUSD();
    setAvaxInUsd(price || 0);

    switch (type) {
      case "-":
        if (item_amount == 1) {
          return;
        }
        setAmount(
          (item_amount - 1) *
            (selectedProduct.fiat_price +
              selectedProduct.shipping +
              selectedProduct.fiat_price * (selectedProduct.platform_fee / 100))
        );
        setItem_amount((prev) => prev - 1);

        break;
      case "+":
        setAmount(
          (item_amount + 1) *
            (selectedProduct.fiat_price +
              selectedProduct.shipping +
              selectedProduct.fiat_price * (selectedProduct.platform_fee / 100))
        );
        setItem_amount((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  const buyAnItem = async () => {
    if (!amount || !selectedProduct || !address) {
      return;
    }
    const res = await buyItem({
      amount,
      from_address: "0xa",
      to_address: address,
    });
  };

  return (
    // <DeployedContractProvider>
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
            <img src={"./assets/woman-h.svg"} alt="" className={classes.img2} />
          </div>
        </div>

        <div className="mt-5 ">
          <p className={classes.listing}>Listing</p>

          <div className="flex flex-wrap">
            {products?.map((product) => (
              <div className="lg:w-3/12 md:w-4/12  w-full mt-4">
                <div
                  className={classes.list_card}
                  onClick={() => viewProductDetails(product)}
                >
                  <div
                    className={classes.product_img}
                    style={{ background: "url(./assets/product-img.svg)" }}
                  >
                    {product.network_id == "amoy" && (
                      <img src="./assets/Amoy.svg" className="p-2" alt="" />
                    )}
                    {product.network_id == "optimism" && (
                      <img src="./assets/Optimism.svg" className="p-2" alt="" />
                    )}
                    {product.network_id == "abitrum" && (
                      <img src="./assets/Abitrum.svg" className="p-2" alt="" />
                    )}
                    {product.network_id == "avalanche_fuji" && (
                      <img
                        src="./assets/Avalanche.svg"
                        className="p-2"
                        alt=""
                      />
                    )}
                  </div>
                  <div className={classes.desc}>
                    <div>
                      {" "}
                      <p>{product.name}</p>
                    </div>
                    <div>
                      {" "}
                      <p className={classes.price}>${product.fiat_price}</p>
                    </div>{" "}
                  </div>

                  <div>
                    <button className={classes.buy_btn}>Buy now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {isModalOpen && selectedProduct && (
        <>
          <div className={classes.overlay}></div>
          <div className={classes.product_details}>
            <div className={classes.product_details_con}>
              <div className="flex gap-3">
                <div
                  className={`${classes.product_details_img}`}
                  style={{ backgroundImage: "url(./assets/woman.svg)" }}
                ></div>
                <div className="w-75">
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <p className={classes.title}>{selectedProduct.name}</p>
                      </div>
                      <div>
                        <img
                          src="assets/bi_x.svg"
                          onClick={() => setIsModalOpen(false)}
                          className="mt-2 cursor-pointer"
                          alt=""
                        />
                      </div>
                    </div>

                    {/* <p className={classes.sku}> SKU: {selectedProduct.sku}</p> */}
                  </div>

                  <div className="flex gap-4 mt-5">
                    <div className="w-50">
                      <div className={classes.meta_1}>
                        <div className={classes.meta_row}>
                          <div>
                            <p className={classes.det}>Price:</p>
                          </div>
                          <div>
                            <p className={classes.det_1}>
                              ${selectedProduct?.fiat_price}
                            </p>
                          </div>
                        </div>
                        <div className={`${classes.meta_row} mt-3`}>
                          <div>
                            <p className={classes.det}>Platform fee:</p>
                          </div>
                          <div>
                            <p className={classes.det_1}>
                              {selectedProduct?.platform_fee}%
                            </p>
                          </div>
                        </div>
                        <div className={`${classes.meta_row} mt-3`}>
                          <div>
                            <p className={classes.det}>Shipping:</p>
                          </div>
                          <div>
                            <p className={classes.det_1}>
                              ${selectedProduct?.shipping}
                            </p>
                          </div>
                        </div>
                        <div className={`${classes.meta_row} mt-3`}>
                          <div>
                            <p className={classes.det}>Amount:</p>
                          </div>
                          <div className="flex gap-3">
                            <div
                              className={classes.opr_bx}
                              onClick={() => handleAmountOfItem("-")}
                            >
                              <img src="assets/icon-minus.svg" alt="" />
                            </div>
                            <div>
                              <p className={classes.opr_bx_number}>
                                {item_amount}
                              </p>
                            </div>
                            <div
                              className={classes.opr_bx}
                              onClick={() => handleAmountOfItem("+")}
                            >
                              <img src="assets/icon-plus.svg" alt="" />
                            </div>
                          </div>
                        </div>

                        <div className={classes.border_bt}></div>

                        <div className={`${classes.meta_row} mt-3`}>
                          <div>
                            <p className={classes.det}>Total price:</p>
                          </div>
                          <div>
                            <p className={classes.det_1}>${amount}</p>
                          </div>
                        </div>
                        <div className={`${classes.meta_row} mt-3`}>
                          <div>
                            <p className={classes.det}>Total tokens:</p>
                          </div>
                          <div>
                            <p className={classes.det_1}>
                              {(amount / avaxInUSD).toFixed(2)} AVAX
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mt-4  ${classes.meta_1} ${classes.meta_2} `}
                      >
                        <p className={classes.title}>Shipping</p>
                        <p className={classes.sub}>
                          Item will be shipped within 7days of purchase. from
                          $300 you will be eligible for free shipping
                        </p>
                      </div>
                    </div>
                    <div className="w-50">
                      <div className={`  ${classes.meta_1} ${classes.meta_2} `}>
                        <div className="flex flex justify-between items-center">
                          <div>
                            <div>
                              <p className={classes.ch_ti}>Chain path:</p>
                            </div>
                            <div>
                              {selectedProduct.network_id == "amoy" && (
                                <img src="./assets/Amoy.svg" alt="" />
                              )}
                              {selectedProduct.network_id == "optimism" && (
                                <img src="./assets/Optimism.svg" alt="" />
                              )}
                              {selectedProduct.network_id == "abitrum" && (
                                <img src="./assets/Abitrum.svg" alt="" />
                              )}
                              {selectedProduct.network_id ==
                                "avalanche_fuji" && (
                                <img src="./assets/Avalanche.svg" alt="" />
                              )}
                            </div>
                            <div>
                              <p className={classes.ch_dec}>
                                {selectedProduct.network_id?.replace("_", " ")}
                              </p>
                            </div>
                          </div>

                          <div>
                            <img src="assets/gg_arrow-up.svg" alt="" />
                          </div>
                          <div>
                            <div>
                              <p className={classes.ch_ti}>Test net:</p>
                            </div>
                            <div>
                              {chain?.name == "Amoy" && (
                                <img src="./assets/Amoy.svg" alt="" />
                              )}
                              {selectedProduct.network_id == "Optimism" && (
                                <img src="./assets/Optimism.svg" alt="" />
                              )}
                              {selectedProduct.network_id == "Abitrum" && (
                                <img src="./assets/Abitrum.svg" alt="" />
                              )}
                              {chain?.name == "Avalanche Fuji" && (
                                <img src="./assets/Avalanche.svg" alt="" />
                              )}
                            </div>
                            <div>
                              <p className={classes.ch_dec}>{chain?.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mt-4  ${classes.meta_1} ${classes.meta_3} `}
                      >
                        <p className={classes.title}>Attribute</p>
                        {Object.entries(selectedProduct.attributes as any).map(
                          ([key, value], index) => (
                            <div
                              className={`${classes.meta_row} mt-3`}
                              key={index}
                            >
                              <div>
                                <p className={classes.det}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </p>
                              </div>
                              <div>
                                <p className={classes.det_1}>
                                  {value as string}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => buyAnItem()}
                    className={classes.buy_now}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
    // </DeployedContractProvider>
  );
}
