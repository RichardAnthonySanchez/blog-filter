'use client'

/* Core */
import React, { useEffect, useState } from 'react'

/* Instruments */
import {
  sortPostsByTitle,
  sortPostsById,
  reversePosts,
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
  const [sortById, setSortById] = useState(false);
  const [sortByTitle, setSortByTitle] = useState(false);

  const data = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
      if (postsStatus === 'idle') {
        console.log('before dispatch')
        dispatch(postsAsync())
      }
    }, [postsStatus, dispatch])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      if (searchTerm === '') {
        dispatch(postsAsync());
      } else {
        dispatch(filterPosts(searchTerm));
      }
    }

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
        onChange={handleSearch}
      />
      </div>
    </>

  const handleSortById = () => {
    setSortById(!sortById);
    dispatch(sortPostsById());
    if (!sortById) {
      dispatch(reversePosts());
    }
  };

  const handleSortByTitle = () => {
    setSortByTitle(!sortByTitle);
    dispatch(sortPostsByTitle());
    if (!sortByTitle) {
      dispatch(reversePosts());
    }
  };

  return (
    <>
      <h2>Blog Browser</h2>
      {search}
      <div>
        <button onClick={handleSortById}>
          Toggle Sort by ID ({sortById ? 'Descending' : 'Ascending'})
        </button>
        <button onClick={handleSortByTitle}>
          Toggle Sort by Title ({sortByTitle ? 'Descending' : 'Ascending'})
        </button>
      </div>
      {content}
    </>
  )
}