import ProductListAllProd from "@/component/productListAllProd";
import { Fragment } from "react";
import Head from "next/head";
import ProductDetail from "@/component/productDetail";
import { MongoClient, ObjectId } from "mongodb";
import classes from "./index.module.css";
import Layout from "@/component/layout/layout";

function ProductDetails(props) {
  return (
    <Layout categories={props.categories} products={props.products}>
      <Fragment>
        <Head>
          <title>{props.productData.title}</title>
          <meta name="description" content={props.productData.description} />
          <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        </Head>
        <ProductDetail
          title={props.productData.title}
          image={props.productData.image}
          nutrition={props.productData.nutrition}
          description={props.productData.description}
          qty={props.productData.qty}
          price={props.productData.price}
          outOfStock={props.productData.outOfStock}
          id={props.productData.id}
        />
        <h1 className={classes.otherProd}>Products You May be Interested in</h1>
        <ProductListAllProd products={props.products} />
      </Fragment>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db();
    const productsCollection = db.collection("products");

    const products = await productsCollection
      .find({}, { projection: { _id: 1 } })
      .toArray();

    client.close();

    return {
      fallback: "blocking",
      paths: products.map((product) => ({
        params: { productId: product._id.toString() },
      })),
    };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return {
      fallback: "blocking",
      paths: [],
    };
  }
}

export async function getStaticProps(context) {
  try {
    const productId = context.params.productId;
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db();
    const productsCollection = db.collection("products");

    const allProducts = await productsCollection
      .find({}, {
        projection: {
          _id: 1,
          title: 1,
          price: 1,
          category: 1,
          image: 1,
          nutrition: 1,
          outOfStock: 1,
          description: 1,
          qty: 1
        }
      })
      .toArray();

    const selectedProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!selectedProduct) {
      return { notFound: true };
    }

    // Get related products (same category)
    const relatedProducts = allProducts.filter(
      (el) => el.category === selectedProduct.category && el._id.toString() !== productId
    );

    const categories = await productsCollection.distinct("category");

    client.close();

    return {
      props: {
        productData: {
          id: selectedProduct._id.toString(),
          title: selectedProduct.title,
          price: selectedProduct.price,
          category: selectedProduct.category,
          image: selectedProduct.image,
          nutrition: selectedProduct.nutrition,
          description: selectedProduct.description,
          outOfStock: selectedProduct.outOfStock ?? null,
          qty: Number(selectedProduct.qty),
        },
        products: relatedProducts.map((product) => ({
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
  } catch (error) {
    console.error("Error fetching product details:", error);
    return { notFound: true };
  }
}

export default ProductDetails;
