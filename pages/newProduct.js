
import { Fragment } from "react";
import ProductForm  from "../component/productForm"
import Head from "next/head";
import DashboardNavbar from "@/dashboard/dashboardNavbar";
import classes from './newProduct.module.css';
import { useSession } from "next-auth/react";
import { data } from "./api/regions";

 
 


 
function NewProduct() { 
const{data:session, status}  =  useSession()
   
  async function submitHandler(productData){

    const response = await fetch('api/new-product',{
      body: JSON.stringify(productData),
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      }
    
    })
  
     }
     
    //  if(status === 'loading'){
    //   return <p>Loading</p> 
    // }
    // if(status === 'unauthenticated'){
    //   return <div className={classes.access}><p>Access Denied</p></div>
    // }
    
  return ( 
    <Fragment>
      <Head>
        <title>Add a New Product</title>
        <meta
          name='description'
          content='Add new products for online sales and services.'
        />
      </Head>
      <div className={classes.header}>
        <h1>Add New Product</h1>
        </div>
      <div className={classes.section}>
       <DashboardNavbar/>
      <ProductForm onAddProduct={submitHandler}/>
  
      
      </div>
      
      
      
      
    </Fragment>
   );
}
 
export default NewProduct;