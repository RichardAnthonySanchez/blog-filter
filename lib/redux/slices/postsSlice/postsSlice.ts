import { createSlice } from '@reduxjs/toolkit';

/* Instruments */
import { postsAsync } from './thunks'

const initialState: PostsSliceState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  
  extraReducers(builder) {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(postsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

/* Types */
export interface PostsSliceState {
  posts: Array<Post>;
  status: 'idle' | 'succeeded' |'loading'| 'failed';
  error?: string | null;
}

export default postsSlice.reducer;