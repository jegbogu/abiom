import DashboardNavbar from "@/dashboard/dashboardNavbar";
import { MongoClient } from "mongodb";
import classes from './admin-products.module.css';
import { useRouter } from "next/router";
import { useState } from 'react';

function AdminProducts(props) {
  const allProduct = props.products;
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log("Deleted:", data);

      // Refresh the current page
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={classes.mainSection}>
      <div className={classes.header}>
        <h1>All Available Products</h1>
      </div>

      <div className={classes.section}>
        <DashboardNavbar />

        <div className={classes.sectionTable}>
          <form>
            <label htmlFor='search'>Search Product</label><br />
            <input
              type='text'
              placeholder="Search Product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allProduct
                .filter((product) => {
                  if (search.trim() === '') return true;
                  return product.title?.toLowerCase().includes(search.toLowerCase());
                })
                .map((product, i) => (
                  <tr key={product.id}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={product.image} alt={product.title} style={{ width: "50px", height: "50px" }} />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td
                      className={classes.edit}
                      onClick={() => router.push(`edit/${product.id}`)}
                    >
                      Edit
                    </td>
                    <td
                      className={classes.delete}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find({}, {
      projection: {
        _id: 1,
        title: 1,
        price: 1,
        category: 1,
        image: 1,
        nutrition: 1,
        description: 1,
        qty: 1,
        outOfStock: 1
      }
    })
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
        outOfStock: product.outOfStock ?? null,
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
          outOfStock: product.outOfStock ?? null,
        })),
      categories,
    },
  };
}

export default AdminProducts;
