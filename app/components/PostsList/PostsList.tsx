'use client'

/* Core */
import React, { useEffect, useState } from 'react'

/* Instruments */
import {
  filterPosts,
  useSelector,
  useDispatch,
  postsAsync,
} from '@/lib/redux'
import Link from "next/link"

import { selectAllPosts, getPostsStatus, getPostsError } from '@/lib/redux/slices/postsSlice/selectors' 

export default function PostsList() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');

  const data = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
      if (postsStatus === 'idle') {
        console.log('before dispatch')
        dispatch(postsAsync())
      }
    }, [postsStatus, dispatch])

    const handleSearch = () => {
      dispatch(filterPosts(searchTerm));
    };

    let content;
    if (postsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsStatus === 'succeeded') {
        content = 
        <ul className='card'>
          {data.map((post) => (
            <li key={post._id}>
                <Link href={post.link}>
                  {post.title}
                  <ul>
                    <li>{post.author}</li>
                    <li>{post.category}</li>
                  </ul>
                </Link>
              </li>
          ))}
       </ul>
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    let search = 
    <>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
      </div>
    </>

  return (
    <>
      <h2>Blog Browser</h2>
      {search}
      {content}
    </>
  )
}