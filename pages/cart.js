import CartList from "../component/cartList";
import { useContext, useState, useEffect } from "react";
import CartsContext from "../store/product-context";
import classes from "./cart.module.css";
import Link from "next/link";
import CheckOutOrShop from "@/component/checkoutOrShop";
import Layout from "@/component/layout/layout";
import { MongoClient } from "mongodb";

function ShopingCart(props) {
  const cartCtx = useContext(CartsContext);

  return (
    <Layout categories={props.categories} products={props.products}>
      <section className={`${classes.section} homeSection`}>
        <h1>Items You Shopped</h1>

        <CartList products={cartCtx.carts} />
        <CheckOutOrShop />
      </section>
    </Layout>
  );
}

export default ShopingCart;

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
        outOfStock: product.outOfStock ?? null,
        qty: Number(product.qty),
      })),
      basketProducts: products
        .filter((product) => product.category === "basket") // Filter in-memory
        .map((product) => ({
          id: product._id.toString(),
          title: product.title,
          price: product.price,
          category: product.category,
          image: product.image,
          nutrition: product.nutrition,
          description: product.description,
          outOfStock: product.outOfStock ?? null,
          qty: Number(product.qty),
        })),
      categories,
    },
  };
}
