'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'; 
import PostCard from './PostCard';

const Feed = () => {
  const { data: session } = useSession(); 
  const [posts, setPosts] = useState([]); 

  useEffect( () => {
    const getPostsData = async () => { 
      try { 
        const response = await fetch('/api/posts/public'); 
        const postsResponse = await response.json() 
        
        if(postsResponse.length === 0) {
          setPosts(['No posts available']); 
          return; 
         } 
  
        setPosts(postsResponse); 
      } catch (err) { 
        console.log("Error in feed");  
        console.error(err); 
      }
    }

    getPostsData(); 
  }, [])
  return (
    <section>
      { posts.length === 0 && 
        <p className='font-satoshi text-base'> Loading... </p>
      }

      { posts[0] === 'No posts available' && 
        <p> { posts[0] } </p>
      }

      { posts.length > 0 && posts[0] != 'No posts available' && 
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