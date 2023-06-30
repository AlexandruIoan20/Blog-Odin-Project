'use client'; 

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const PostCard = ({ dev, post }) => {
  const { data: session } = useSession(); 
  const pathName = usePathname (); 
  const router = useRouter (); 

  return (
    <div className='mb-4'>
      <article className='bg-slate-200 px-6 pb-2 pt-2 mx-4 mt-2 rounded-2xl shadow-lg flex'>
        <div>
          <pre> {JSON.stringify(pathName) } </pre>
          <h2 className='text-2xl font-inter'>{ post.title } </h2>
          <p className='text-xs font-satoshi'> { post.creator.username } </p>
        </div>
        <div className='flex justify-end ml-auto'>
          <button className='default_button'> View Post</button>
        </div>
      </article>
      { dev && pathName ==  `/users/${session.user.id}` &&
          <div className='mx-8 bg-slate-300 rounded-xl py-4 flex justify-center gap-x-64'>
            <Link href = '/'>Edit</Link>
            <Link href = '/'>Delete</Link>
          </div>
      }
    </div>
  )
}

export default PostCard