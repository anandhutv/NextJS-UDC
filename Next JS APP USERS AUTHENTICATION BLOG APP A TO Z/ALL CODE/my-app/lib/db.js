import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://nextjs-course:nextJS987@cluster0.ckuu9.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );

  return client;
}
