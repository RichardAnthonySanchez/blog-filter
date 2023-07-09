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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

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
            <li key={post._id} className={montserrat.className}>
                <Link href={post.link}>
                  {post.title}
                  <ul>
                    <li className='subtext'>{post.author}</li>
                    <li className='subtext'>{post.category}</li>
                  </ul>
                </Link>
              </li>
          ))}
       </ul>
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    let search = 
    <div className='search-container'>
        <div className='search'>
        <FontAwesomeIcon icon={faSearch} />
        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
    </div>



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

  let buttons =
  <>
    <div>
      <button onClick={handleSortById}>
        Date {sortById ? <FontAwesomeIcon icon={faSortDown}/> : <FontAwesomeIcon icon={faSortUp}/>}
      </button>
      <button onClick={handleSortByTitle}>
        Title {sortByTitle ? <FontAwesomeIcon icon={faSortDown}/> : <FontAwesomeIcon icon={faSortUp}/>}
      </button>
    </div>
  </>

  return (
    <>
      <div className='header-container'>
        <h2 className={montserrat.className}>Blog Archive</h2>
        {buttons}
        {search}
      </div>
       {content} 
    </>
  )
}