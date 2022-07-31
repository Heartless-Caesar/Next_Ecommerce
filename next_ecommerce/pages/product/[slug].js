import React from "react";
import { urlFor, client } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div className="image-container">
          <img src={urlFor(image && image[0])} alt="product-image-here" />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  //Fetch single
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const product = await client.fetch(productQuery);

  //Fetch all
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return { props: { product, products } };
};

export default ProductDetails;
