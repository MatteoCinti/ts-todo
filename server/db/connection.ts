import { connect } from 'mongoose';

export const connectToDatabase = (): Promise<void> => {
  const db_uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@just-do-it.jdi7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  return connect(db_uri)
          .then(()=> console.log('Connected to DB'))
          .catch((error) => {
            console.error("db error", error);
          });
}
