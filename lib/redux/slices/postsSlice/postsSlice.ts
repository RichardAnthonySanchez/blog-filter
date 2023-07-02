import { createSlice } from '@reduxjs/toolkit';
import  fetchPosts  from './fetchPosts'

const postsSlice = createSlice({
    name: 'posts',
    initialState: fetchPosts,
    reducers: {},
    /*
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.fulfilled, (state, action) => {
          return action.payload;
        });
    },
    */
  });

  export const selectAllPosts = (state) => state.posts;
  
  export default postsSlice.reducer;