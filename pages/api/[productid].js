import { MongoClient, ObjectId } from 'mongodb'
 
async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return;
  }
  const {productid} = req.query
  // console.log(productid)


    

  const client =  await MongoClient.connect(process.env.DB)

  const db = client.db();

 const productsCollection = db.collection('products');

   const selectedProduct = await productsCollection.findOneAndDelete({
    _id:new ObjectId(productid),
  });
   
 
 
  res.status(201).json(selectedProduct);
  client.close();

}
 

export default handler;