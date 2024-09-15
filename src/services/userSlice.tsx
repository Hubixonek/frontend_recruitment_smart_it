import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string; 
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<IUser[]>(API_URL || '');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [] as IUser[],
    filteredList: [] as IUser[],
    filters: {
      nameFilter: '',
      usernameFilter: '',
      emailFilter: '',
      phoneFilter: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredList = state.list.filter((user) => {
        const { nameFilter, usernameFilter, emailFilter, phoneFilter } = state.filters;
        return (
          user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
          user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
          user.phone.toLowerCase().includes(phoneFilter.toLowerCase())
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.filteredList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = usersSlice.actions;
export default usersSlice.reducer;
