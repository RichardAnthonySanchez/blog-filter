/* Components */
import { Posts } from './components/Posts/Posts'
import PostsList from './components/PostsList/PostsList'
import { Counter } from './components/Counter/Counter'

import fetchPosts from '@lib/redux/slices/postsSlice/fetchPosts'

export default async function IndexPage() {
  const data = await fetchPosts()
  return (
    <>
    <h2>My Posts</h2>
    <ul>
      {data.map((post) => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
    
    </>
  )
}

export const metadata = {
  title: 'Redux Toolkit',
}
