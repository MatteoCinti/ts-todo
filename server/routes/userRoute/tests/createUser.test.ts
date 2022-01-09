const mockingoose = require('mockingoose');
import { createUser } from "../controllers/register";
import User from "../../../db/schemas/user.schema";

beforeEach(() => {
  mockingoose.resetAll();
  jest.clearAllMocks();
});

describe('CreateUser', () => {
  const username = 'testusername'
  const password = 'testpassword';

  test('should validate', async () => {
    const user = new User({
      username,
      password
    });

    await user.validate();
    expect(user.toObject()).toHaveProperty('_id');
  });

  test('should create a new user', async () => {
    mockingoose(User).toReturn({ username, password }, 'save');
  
    const user = await createUser(username, password);
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user).toHaveProperty('_id');
  });
})