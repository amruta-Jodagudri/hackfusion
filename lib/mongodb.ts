// import { MongoClient } from 'mongodb'

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise: Promise<MongoClient>

//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
  
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()


// export default clientPromise

// import { MongoClient, ServerApiVersion } from 'mongodb'

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }

// const uri = process.env.MONGODB_URI

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// })

// async function connectToDatabase() {
//   try {
//     await client.connect()
//     await client.db('admin').command({ ping: 1 })
//     console.log('Pinged your deployment. Successfully connected to MongoDB!')
//   } catch (error) {
//     console.error('MongoDB connection error:', error)
//     throw new Error('Failed to connect to MongoDB')
//   }
// }

// connectToDatabase()

// export default client


// lib/db.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
 const db = client.db();
export default db;