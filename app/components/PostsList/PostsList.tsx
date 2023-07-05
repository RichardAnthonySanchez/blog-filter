'use client'

/* Core */
import React, { useEffect } from 'react'

/* Instruments */
import {
  postsSlice,
  useSelector,
  useDispatch,
  postsAsync,
} from '@/lib/redux'

import { selectAllPosts, getPostsStatus, getPostsError } from '@/lib/redux/slices/postsSlice/selectors' 

export default function PostsList() {
  const dispatch = useDispatch()

  const data = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
      if (postsStatus === 'idle') {
        console.log('before dispatch')
        dispatch(postsAsync())
      }
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded') {
        content = 
        <ul>
        {data.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
       </ul>
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

  return (
    <>
      <h2>Blog Browser</h2>
      {content}
    </>
  )
}