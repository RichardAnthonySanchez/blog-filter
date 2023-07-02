import fetchPosts from '@lib/redux/slices/postsSlice/fetchPosts'

export default async function PostsList(){
  const data = await fetchPosts()
    return (
      <>
      <h2>Blog Browser</h2>
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