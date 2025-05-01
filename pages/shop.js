import { MongoClient } from 'mongodb';
import ProductListShop from '@/component/productListShop';
import Head from 'next/head';
import { Fragment } from 'react';
 import Layout from '@/component/layout/layout'; // Use Layout instead of directly using MainNavigation
import classes from './shop.module.css'



const Shop = (props) => {
  return ( 
    <Layout categories={props.categories} products={props.products}> 
    <Fragment>
      <Head>
      <title>Household name in online supplies and services.</title>
      </Head>
     
      <h1 className={classes.prod}>Our Products</h1>
      <ProductListShop products={props.products}/>
     
    </Fragment>
      
    </Layout>
   );
  
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find({}, { projection: { _id: 1, title: 1, price: 1, category: 1, image: 1, nutrition: 1, description: 1, qty: 1 } })
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
          qty: Number(product.qty),
        })),
      categories,  
    },
  };
}
 
export default Shop;