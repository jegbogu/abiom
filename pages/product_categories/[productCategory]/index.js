import ProductCategoryList from "@/component/productCategoryList";
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import Layout from "@/component/layout/layout";
import classes from "./index.module.css";

function ProductCategories(props) {
    let transCategory;
    let category = props.categoryTitle;
    
    if (category.includes("and")) {
        const words = category.split("and").map(word => word.trim());
        transCategory = words.map(word => word[0].toUpperCase() + word.slice(1)).join(" & ");
    } else if (category.includes(" ")) {
        const words = category.split(" ").map(word => word.trim());
        transCategory = words.map(word => word[0].toUpperCase() + word.slice(1)).join(" & ");
    } else {
        transCategory = category[0].toUpperCase() + category.slice(1);
    }

    // Adding content
    const categoryContentMap = {
        "basket": "Creating a unique hamper that sets the season going",
        "cereal and flour": "Well processed and natural cereal and flour for all seasons",
        "cooking oil": "Well processed and natural cooking oil for all your fries, cooking etc",
        "drinks": "Well affordable drinks with best of quality",
        "food and soup": "Highly nutritious for all food and soups",
        "fruits and nuts": "Highly nutritious and natural fruits and nuts",
        "grains and pasta": "Well processed and natural cereal grains with premium pasta for seasons",
        "home appliances": "Durable home appliances with long guarantee"
    };
    
    const categoryContent = categoryContentMap[category] || "Explore our range of high-quality products.";

    return (
        <Layout categories={props.categories} products={props.products}>
            <Fragment>
                <Head>
                    <title>{props.categoryTitle}</title>
                    <meta name="description" content={`Products under ${props.categoryTitle}`} />
                    <link rel="shortcut icon" href="../logo.png" type="image/x-icon" />
                </Head>
                <div className={classes.category}>
                    <h2>{transCategory}</h2>
                    <p>{categoryContent}</p>
                </div>
                <ProductCategoryList products={props.products} />
            </Fragment>
        </Layout>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db();
    const productsCollection = db.collection("products");

    const categories = await productsCollection.distinct("category");
    client.close();

    return {
        fallback: "blocking",
        paths: categories.map(category => ({ params: { productCategory: category.toString() } })),
    };
}

export async function getStaticProps(context) {
    const productCategory = context.params.productCategory;
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db();
    const productsCollection = db.collection("products");

    const productsCategory = await productsCollection.find({ category: productCategory }).toArray();
    const categories = await productsCollection.distinct("category");

    const products = await productsCollection
      .find({}, { projection: { _id: 1, title: 1, price: 1, category: 1, image: 1, nutrition: 1, description: 1, qty: 1 } })
      .toArray();

    client.close();

    return {
        props: {
            categoryTitle: productCategory,
            products: productsCategory.map(product => ({
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                nutrition: product.nutrition,
                description: product.description,
                qty: Number(product.qty),
                id: product._id.toString(),
            })),
            allProducts: products.map(product => ({
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
        revalidate: 1,
    };
    
}

export default ProductCategories;
