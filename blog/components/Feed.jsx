'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'; 
import PostCard from './PostCard';

const Feed = () => {
  const { data: session } = useSession(); 
  const [posts, setPosts] = useState([]); 

  useEffect( () => {
    const getPostsData = async () => { 
      const response = await fetch('api/posts/public'); 
      const postsResponse = await response.json(); 

      setPosts(postsResponse); 
    }

    getPostsData(); 
  }, [])
  return (
    <section>
      { posts.length === 0 && 
        <p className='font-satoshi text-base'> Loading... </p>
      }

      { posts.length > 0 && 
        posts.map(post => { 
          return( 
            <PostCard 
              key = { post.id }
              post = { post }
              dev = { post.creator.toString() === session?.user.id }
            /> 
          )
        })
      }
    </section>
  )
}

export default Feed; 