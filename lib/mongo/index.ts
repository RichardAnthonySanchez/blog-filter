import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI

if (!URI) throw new Error('URI not in .env')

const client = new MongoClient(URI);
let clientPromise = async function run() {
    const database = client.db('blog-data');
    const posts = database.collection('posts');

    const findResult = await posts.find({}).toArray();

    return findResult;

  }

export default clientPromise