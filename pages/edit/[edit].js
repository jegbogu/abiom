import { useRef,useState } from 'react';
import classes from './edit.module.css';
import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import Spinner from '@/icons/spinner';
 

function ProductEdit(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)
  function showDetailsHandler() {
    setSpinner(<Spinner/>)
    

   }


 async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    // const productData = {
    //   title: enteredTitle,
    //   image: enteredImage,
    //   price:  enteredPrice,
    //   description: enteredDescription,
    // };
 
const response =  await fetch(`/api/edit/${props.productData.id}`,{
    method : 'POST',
    body: JSON.stringify({enteredTitle,enteredImage,enteredPrice,enteredDescription}),
    headers:{
        'Content-Type':'application/json'
    },

});
let ProductData = await response.json()
router.push('/') 
 
console.log(ProductData)
if(!response.ok){
    throw new Error(ProductData.message || 'something went wrong')
}
 
  }




    return(
        <div className={classes.card}>
          <div className={classes.header} ><h1>Edit Product</h1></div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Product Title</label>
            <input type='text' required id='title' ref={titleInputRef} placeholder={props.productData.title}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='image'>Product Image</label>
            <input type='url' required id='image' ref={imageInputRef} placeholder={props.productData.image}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='price'>Product Price</label>
            <input type='number' required id='price' ref={priceInputRef} placeholder={props.productData.price} />
          </div>
          <div className={classes.control}>
            <label htmlFor='description'>Product Description</label>
            <textarea
              id='description'
              required
              rows='5'
              ref={descriptionInputRef}
              placeholder={props.productData.description}
            ></textarea>
          </div>
          <div className={classes.actions}>
           <button onClick={showDetailsHandler}> Update Product {spinner}</button>
          </div>
        </form>
      </div>
    )
}
export async function getStaticPaths(){
  const client =  await MongoClient.connect(process.env.DB)
    
    const db = client.db()

    const productsCollection = db.collection('products')
  
    const products = await productsCollection.find({},{_id:1}).toArray()
  
    client.close()

    return{
        fallback: 'blocking',
        paths: products.map((product)=>({
            params:{edit: product._id.toString()},
        })),
    }


}



export async function getStaticProps(context){
    const edit = context.params.edit
    const client =  await MongoClient.connect(process.env.DB)

const db = client.db()
const productsCollection = db.collection('products')
const selectedProduct = await productsCollection.findOne({
    _id:new ObjectId(edit),
  });
  client.close();


  return {
    props: {
      productData: {
        id:  selectedProduct._id.toString(),
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        description: selectedProduct.description,
      },
      revalidate: 1,
    },
     
  };
};


export default ProductEdit