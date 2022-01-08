import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const testMongoInstance = async () => {
  const mongod = await MongoMemoryServer.create();
  return mongod
}

export const connectToDatabase = (): Promise<void> => {
  const db_uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@just-do-it.jdi7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  return connect(db_uri)
          .then(()=> console.log('Connected to DB'))
          .catch((error) => {
            console.error("db error", error);
          });
}

export const testDbConnection = async (): Promise<void> => {
  const mongod = await testMongoInstance();
  const uri = mongod.getUri();
  connect(uri);
}

export const closeTestDbConnection = async (mongod): Promise<void> => {
  await connection.dropDatabase();
  await connection.close();
  await mongod.stop();
}

export const clearDatabase = async (): Promise<void> => {
  const { collections } = connection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}