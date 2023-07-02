export default async function fetchPosts() {
  const res = await fetch(`http://localhost:3000/api/posts`)

  if (!res.ok) throw new Error('failed to fetch posts')

  return (
    res.json()
  )
}