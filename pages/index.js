import { MongoClient } from "mongodb";
import ProductList from "../component/productList";
import ProductListTwo from "../component/productListTwo";
import Head from "next/head";
import { Fragment } from "react";
import BannerL from "../component/banner/bannerL";
import classes from "./index.module.css";
import BlogSection from "@/component/blogSection";

import BasketList from "@/component/basketList";
import Layout from "@/component/layout/layout"; // Use Layout instead of directly using MainNavigation
import ProductCarousel from "@/component/productCarousel";
import ProductCategories from "@/component/productCategories";

const Home = (props) => {
  return (
    <Layout categories={props.categories} products={props.products}>
      <Head>
        <title>..Household name in online supplies and services.</title>
      </Head>

      <BannerL />
      {/* <Review /> */}

      <section className={`${classes.discount}`}>
        <section className="homeSection">
          <div className={classes.disInfo}>
            <h3>Our Basket Products</h3>
            {/* <p>This Discount starts from the 13th of May 2023 and ends on the 21st of May 2023</p> */}
          </div>

          <BasketList basketProducts={props.basketProducts} />
        </section>
      </section>
      <section className="homeSection">
        <ProductCarousel
          products={props.products}
          title={
            <div className={classes.carousel}>
              <h3>Today&apos;s big deals</h3>
            </div>
          }
        />
      </section>
      <section className="homeSection">
        <div className={classes.categories}>
          <h3>Shop Our Most Popular Categories</h3>
        </div>

        <div className={classes.Productcategories}>
          <ProductCategories />
        </div>
      </section>

      <section className="homeSection">
        <div className={classes.categories}>
          <h3>Top Sellers</h3>
        </div>
        <ProductList products={props.products} />
      </section>
      <section className="homeSection">
        <div className={classes.productListTwo}>
          <h3>Shop extraordinary items</h3>
        </div>
        <ProductListTwo products={props.products} />
      </section>
      <section className="homeSection">
        <BlogSection
          title={
            <div className={classes.blogSection}>
              <h3>Abiom Blog</h3>
            </div>
          }
        />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find(
      {},
      {
        projection: {
          _id: 1,
          title: 1,
          price: 1,
          category: 1,
          image: 1,
          nutrition: 1,
          description: 1,
          qty: 1,
          outOfStock: 1,
        },
      }
    )
    .toArray();

  // Fetch distinct categories
  const categories = await productsCollection.distinct("category");

  client.close();

  return {
    props: {
      products: products.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        nutrition: product.nutrition,
        description: product.description,
        qty: Number(product.qty),
        outOfStock: product.outOfStock ?? null, // Use null if undefined
      })),
      basketProducts: products
        .filter((product) => product.category === "basket")
        .map((product) => ({
          id: product._id.toString(),
          title: product.title,
          price: product.price,
          category: product.category,
          image: product.image,
          nutrition: product.nutrition,
          description: product.description,
          qty: Number(product.qty),
          outOfStock: product.outOfStock ?? null, // Use null if undefined
        })),
      categories,
    },
  };
}

export default Home;
