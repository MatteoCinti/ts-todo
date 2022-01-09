import request from 'supertest';
import User from '../../../db/schemas/user.schema';
const mongoose = require('mongoose');
const databaseName = "test";

const PORT = process.env.PORT || 5000;
const HOST = `http://localhost:${PORT}`;

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterEach((done) => {
  removeAllCollections().then(() => done());
});

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
})

describe('The POST newUser method:', () => {

  beforeEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      console.log('Cleaning - test database dropped');
    });
  return done();
  });

  test ('should reject invalid data with 400 status', (done) => {
    const badReq = {
      notAJob: 'not real data',
    };
    request(HOST)
      .post('/api/users/register')
      .send(badReq)
      .expect(400, done);
  });

  // test ('should return a new user', (done) => {
  //   const newUser = {
  //     username: 'testusernamey',
  //     password: 'passwordy'
  //   };
  //   request(HOST)
  //     .post('/api/users/register')
  //     .send(newUser)
  //     .expect(200, done)
  // });
})

describe('The POST login method:', () => {

  beforeEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
    console.log('Cleaning - test database dropped');
    });
  return done();
  });

  test ('should reject invalid data with 401 status', (done) => {
    const newUser = {
      username: 'testusernamey',
      password: 'passwordy'
    };
    const wrongPassword = {
      ...newUser,
      password: 'password'
    }
    const wrongUsername = {
      ...newUser,
      username: 'wrong'
    }
    request(HOST)
    .post('/api/users/register')
    .send(newUser)

    request(HOST)
      .post('/api/users/login')
      .send(wrongPassword)
      .expect(401)

    request(HOST)
      .post('/api/users/login')
      .send(wrongUsername)
      .expect(401, done)
  });
  test ('should return loggedIn user', (done) => {
    const newUser = {
      username: 'testusernamey',
      password: 'passwordy'
    };
    // request(HOST)
    //   .post('/api/users/register')
    //   .send(newUser)
    request(HOST)
      .post('/api/users/login')
      .send(newUser)
      .expect(res => {
        res.body.password = newUser.password;
        res.body.username = newUser.username;
      })
      .expect(200, done)
    
  });

})