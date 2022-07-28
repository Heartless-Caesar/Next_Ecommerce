import React from "react";
import { HeroBanner, FooterBanner, Product } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      {console.log(banners)}
      <div className="products-heading">
        <h2>Best selling product</h2>
        <p>Services for many situations</p>
        <div className="products-container">
          {products.map((product) => product.name)}
        </div>
        <footer>
          <FooterBanner />
        </footer>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return { props: { products, banners } };
};

export default Home;
