import { MongoClient, ServerApiVersion, } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error("DB_URI is not defined in the .env file");
}

let mongoClient: MongoClient;

const connectToDb = async () => {
    if(!mongoClient) {
        mongoClient = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          });
          await mongoClient.connect();
          console.log("Connected to MongoDB");
    }

    return mongoClient;
}



export default connectToDb;