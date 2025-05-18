import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'; // Use ES module style if using `import`

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username, password } = req.body;

    // Connect to the database
    const client = await MongoClient.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const user = await db.collection('adminusers').findOne({ username });

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default handler;
