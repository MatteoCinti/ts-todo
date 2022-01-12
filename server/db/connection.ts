import { connect } from 'mongoose';

const connectToDatabase = (): Promise<void> => {
  const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@just-do-it.jdi7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  return connect(dbUri)
    .then(() => console.log('Connected to DB'))
    .catch((error) => {
      console.error('db error', error);
    });
};

export default connectToDatabase;
