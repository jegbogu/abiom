import { MongoClient, ObjectId } from 'mongodb'
 
async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return;
    }
    const {editid} = req.query
    console.log(editid)
    const data = req.body
    const{enteredTitle,enteredImage,enteredPrice,enteredDescription} = data
  
   
      
  
    const client =  await MongoClient.connect(process.env.DB)
  
    const db = client.db();
   
   const productsCollection = db.collection('products');
  
     const selectedProduct = await productsCollection.updateOne({_id: new ObjectId(editid)},{$set:{title:enteredTitle,image:enteredImage,price:enteredPrice,description:enteredDescription}})
     console.log(selectedProduct)
   
    res.status(201).json(selectedProduct);
    client.close();
  } catch (error) {
    console.log (error)
  }
 

}
 

export default handler;