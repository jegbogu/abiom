
import DashboardNavbar from "@/dashboard/dashboardNavbar"
import { MongoClient } from "mongodb"
import classes from './admin-products.module.css'
import { useRouter } from "next/dist/client/router"
import { useState } from 'react';



function AdminProducts(props) {
    const allProduct = props.products
    const router = useRouter()
    const [search, setSearch] = useState('')

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
                        <input type='text' required placeholder="Search Product"
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                    <table>
                        <tr>
                            <th>S/N</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {allProduct.filter((product) => {
                            return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search)
                        }).map((product, i) => (
                            <tr key={product.id}>
                                <td>{i + 1}</td>
                                <td><img src={product.image} alt={product.title} /></td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>

                                <td className={classes.edit} onClick={async () => {
                                    router.push(`edit/${product.id.toString()}`)
                                }}>Edit</td>
                                <td className={classes.delete} onClick={async () => {

                                    const response = await fetch(`api/${product.id.toString()}`, {
                                        method: 'DELETE',
                                    })
                                    let userData = await response.json()
                                    console.log(userData)
                                    router.push('/admin-products')

                                }}>Delete</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>

    )
}





 export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find({}, { projection: { _id: 1, title: 1, price: 1, category: 1, image: 1, nutrition: 1, description: 1, qty: 1 , outOfStock: 1} })
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
        outOfStock: product.outOfStock
        
        
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
          outOfStock: product.outOfStock,
        })),
      categories,  
    },
  };
}


export default AdminProducts