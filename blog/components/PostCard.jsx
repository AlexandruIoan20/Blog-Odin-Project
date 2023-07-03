'use client'; 

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa'; 
import { CommentButton, LikeButton } from './buttons/interaction_buttons';

const PostCard = ({ dev, post, onDeletePost, onEditPost }) => {
  const { data: session } = useSession(); 
  const pathName = usePathname (); 
  const router = useRouter (); 

  return (
    <div className='mb-4'>
      <section className='bg-slate-200 px-6 pb-2 pt-2 mx-4 mt-2 rounded-2xl shadow-lg'>
        <article className='flex'>
          <div>
            <h2 className='text-2xl font-inter'>{ post.title } </h2>
            <p className='text-xs font-satoshi'> 
              { post.creator.username != undefined && `@${ post.creator.username }`}
            </p>
          </div>
          <div className='flex justify-end ml-auto'>
            <button className='default_button'> View Post</button>
          </div>
        </article>
        <article>
          <LikeButton executeFunction={ () => { console.log('executed') }} /> 
          <CommentButton executeFunction={ () => { console.log('executed') }}/> 
        </article>
      </section>
      { dev && pathName ==  `/users/${session.user.id}` &&
          <div className='mx-8 bg-slate-300 rounded-xl py-2 flex justify-center gap-x-64'>
            <button type = 'button' onClick = { () => onEditPost(post) }>Edit</button>
            <button type = 'button' onClick = { () => { onDeletePost(post);}}> 
              Delete
            </button>
          </div>
      }
    </div>
  )
}

export default PostCard