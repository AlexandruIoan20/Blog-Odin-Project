'use client'; 

import { useState, useEffect } from "react";
import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession(); 
  const pathname = usePathname(); 
  const [ user, setUser ] = useState({}); 
  const [ grades, setGrades ] = useState([]); 
  const [ activity, setActivity ] = useState({}); 
  const [ checkMyProfile, setCheckMyProfile ] = useState(false); 

  useEffect( () => { 
    const getUserData = async () => { 
      // Get User
      const response = await fetch(`/api${pathname}`); 
      const userResponse = await response.json(); 

      setUser(userResponse); 
      setGrades(userResponse.status); 
      setActivity(userResponse.activity); 

      // Check if it is my account
      const id = pathname.split('/')[2]; 
      if(id === session?.user.id)
        setCheckMyProfile(true); 
    }; 

    getUserData(); 
  }, []); 
  
  const handleEditPost = (post) => { 

  }

  const handleDeletePost = async (post) => { 
    const userPosts = user.activity.posts; 
    try { 
      await fetch(`/api/posts/${post._id.toString()}`, { 
        method: "DELETE", 
        mode: 'cors',
        header: { 
          'Content-Type': 'application/json', 
        }
      }); 
  
      const filteredPosts = userPosts.filter(el => el._id != post._id); 
      setUser({ ...user, activity: { ... user.activity, posts: filteredPosts }}) 
      setActivity({ ...activity, posts: filteredPosts});

      console.log({ user }); 
    } catch (err) { 
      console.log("We have an error"); 
      console.error(err); 
    }
  }
  return (
    <>
      { user != undefined ? 
      (
        <Profile 
          name = 'My'
          user = { user }
          handleEditPost = { handleEditPost }
          handleDeletePost = { handleDeletePost }
          checkMyProfile = { checkMyProfile }
          grades = { grades }
        />
      ) 
      : 
      ( 
        <p> No user yet </p>
      )
    }
    </>
  )
}

export default ProfilePage