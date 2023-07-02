import { useSelector } from "react-redux"
import { selectAllPosts } from "@/lib/redux/slices/postsSlice/postsSlice"

const PostsList = () => {
    //const posts = useSelector(selectAllPosts)
    const posts = selectAllPosts

    /*
    const renderedPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
        </article>
    ))
    */
    const renderedPosts = <h1>test</h1>
  return (
    <section>
        <h2>Posts</h2>
        {renderedPosts}
    </section>
  )
}

export default PostsList