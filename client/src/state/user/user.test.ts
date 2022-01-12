import { RegisterLogin } from './user.interfaces';
import reducer, { userActions } from './user.slice';
import { emptyUserState } from './user.interfaces';
import { handleLogin } from './user.reducers';

describe('User reducer actions', () => {

  it('should logout', async () => {
    const initialState = {
      ...emptyUserState,
      isLoggedIn: true
    }
    const state = reducer(initialState, userActions.logOut)
    expect(state).toEqual({
      ...emptyUserState
    })
  })
  it('should register a new user', async () => {
    const nextState = {
      ...emptyUserState,
      username: 'user',
      password: 'password',
      isLoggedIn: true,
      request: RegisterLogin.register
    }
    const action = { 
      type: handleLogin.fulfilled.type,
      payload: nextState
    }
    const state = reducer(emptyUserState, action)
    expect(state).toEqual({
      ...nextState,
    })
  })
  it('should login', async () => {
    const nextState = {
      ...emptyUserState,
      username: 'user',
      password: 'password',
      isLoggedIn: true,
      request: RegisterLogin.login
    }
    const action = { 
      type: handleLogin.fulfilled.type,
      payload: nextState
    }
    const state = reducer(emptyUserState, action)
    expect(state).toEqual({
      ...nextState,
    })
  })
})