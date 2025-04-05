import { MongoClient } from 'mongodb'


const bcrypt = require('bcrypt');

async function handler(req,res){
  if(req.method === 'POST'){
      try {
      await connectDB()
      const{username, password} = req.body
      // console.log({username, password})

      const client =  await MongoClient.connect(process.env.DB)

      const db = client.db();
    
      const user = await db.collection('adminusers').findOne({username})
      
      //  console.log(userID)
       const validUser = await bcrypt.compare(password, user.password)
       console.log(validUser)
       if(!validUser){
          res.status(403).json({message:'not a user'})
        return
       }
       res.status(200).json(user);
      
       
       
      } catch (error) {
          console.log(error)
      }
  }
}

export default handler