export const fetchPosts = async (): Promise<Array<Post>> => {
  const res = await fetch(`http://localhost:3000/api/posts`)

  if (!res.ok) throw new Error('failed to fetch posts')

  return (
    res.json()
  )
}