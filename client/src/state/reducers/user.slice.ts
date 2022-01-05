import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

interface UserState { 
  [key: string]: string | boolean | undefined;
  username?: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: '',
  isLoggedIn: false
}

const setUsername: CaseReducer<UserState, PayloadAction<string>> = (state, action) => ({
  username: action.payload,
  isLoggedIn: true
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername
  }
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;