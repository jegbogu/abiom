// require('dotenv').config()
import { MongoClient } from 'mongodb'
const bcrypt = require('bcrypt');

 async function handler(req,res){
  if(req.method==='POST') {
    
    const data = req.body;
    // console.log(data)
    
    const {enteredFirstName,enteredLastName,enteredEmail,enteredPassword} = data;

    if (
      !enteredEmail ||
      !enteredEmail.includes('@') ||
      !enteredPassword ||
      enteredPassword.trim().length < 7 ||
      !enteredLastName || 
      enteredLastName.length < 3 ||
      !enteredFirstName || 
      enteredFirstName.length < 3 

    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long.',
      });
      return;
    }



    const client =  await MongoClient.connect(process.env.DB)

    const db = client.db();
   
    const productscollection = db.collection('adminusers');

    const existingUser = await db.collection('adminusers').findOne({ email: enteredEmail });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

    const hashedPassword = await bcrypt.hash(enteredPassword,12)
    const userData = {firstname:enteredFirstName,lastname:enteredLastName,email:enteredEmail,password:hashedPassword}

    

  const result = await productscollection.insertOne(userData);

  console.log(result);

   client.close()
res.status(201).json({message:'data inserted'})
}
 }

 export default handler