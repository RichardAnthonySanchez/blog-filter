/* Instruments */
import { counterSlice } from './slices'
import { postsSlice } from './slices'

export const reducer = {
  //counter: counterSlice.reducer,
  posts: postsSlice.reducer,
}
