// import { MongoClient } from 'mongodb';

// async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const client = await MongoClient.connect(process.env.DB);
//       const db = client.db();
//       const productsCollection = db.collection('products');

//       const result = await productsCollection.updateMany(
//         { outOfStock: { $exists: false } }, // only update if field doesn't exist
//         { $set: { outOfStock: false } }
//       );

//       client.close();

//       res.status(200).json({
//         message: 'outOfStock field added to products',
//         modifiedCount: result.modifiedCount
//       });
//     } catch (error) {
//       console.error('Update error:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

// export default handler;
