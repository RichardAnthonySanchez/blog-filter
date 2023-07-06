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
  reducers: {
    filterPosts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      return {
          ...state,
          posts: state.posts.filter((post) => {
          const title = post.title.toLowerCase();
          return title.includes(searchTerm)
        }),
      }
    },
    sortPostsById: (state) => {
      const sortedPosts = [...state.posts].sort((a, b) => {
        if (a._id < b._id) {
          return -1;
        }
        if (a._id > b._id) {
          return 1;
        }
        return 0;
      });
    
      return {
        ...state,
        posts: sortedPosts,
      };
    },
    sortPostsByTitle: (state) => {
      const sortedPosts = [...state.posts].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    
      return {
        ...state,
        posts: sortedPosts,
      };
    },
    reversePosts: (state) => {
      const reversedPosts = [...state.posts].reverse();
    
      return {
        ...state,
        posts: reversedPosts,
      };
    },    
  },
  
  
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

export const { filterPosts, sortPostsById, sortPostsByTitle, reversePosts } = postsSlice.actions;

export default postsSlice.reducer;