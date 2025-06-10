import classes from './contact.module.css'
import Link from 'next/link'
import { MongoClient } from 'mongodb';
import Layout from '@/component/layout/layout'; 
function Contact(props) {
    return (
        <Layout categories={props.categories} products={props.products}> 
        <div className={classes.section}>
            <div className={classes.header}>
                <h1>How Can We Help?</h1>
            </div>
            <div className={classes.email}>
                <h3><Link href="mailto:abiomsupply@gmail.com">abiomsupply@gmail.com</Link></h3>
            </div>
            <div className={classes.question}>
                <p>We're happy to answer questions. We will do our best to respond to you within 24 hours, sometimes a bit longer on weekends.</p>
            </div>
            <div className={classes.address}>
                <p>Address</p>
            </div>
            <div className={classes.add}>
                <p>11750 PADON RD, NEEDVILLE, TX, 77461-9681</p>
            </div>
            <div className={classes.hr}></div>
        </div>
        </Layout>
    )
}

export default Contact

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find({}, { projection: { _id: 1, title: 1, price: 1, category: 1, image: 1, nutrition: 1, description: 1, qty: 1,outOfStock:1 } })
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