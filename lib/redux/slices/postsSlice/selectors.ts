/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectAllPosts = (state: ReduxState) => state.posts.posts;
export const getPostsStatus = (state: ReduxState) => state.posts.status;
export const getPostsError = (state: ReduxState) => state.posts.error;