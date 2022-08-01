import React from "react";
import { HeroBanner, FooterBanner, Product } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      {console.log(banners)}
      <div className="products-heading">
        <h2>Most utilized services</h2>
        <p>We have services for any situation</p>
        <div className="products-container">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <footer>
          <FooterBanner footerBanner={banners && banners[0]} />
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
