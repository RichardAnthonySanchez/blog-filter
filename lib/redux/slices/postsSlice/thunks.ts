/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchPosts } from './fetchPosts'

export const postsAsync = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
      const response = await fetchPosts()
      return response
    }
)