'use client'; 

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const PostCard = ({ dev, post }) => {
  const pathname = usePathname (); 
  const router = useRouter (); 
  return (
    <article>
      <h2>{ post.title } </h2>
    </article>
  )
}

export default PostCard