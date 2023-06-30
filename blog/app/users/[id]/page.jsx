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
    console.log(`/api${pathname}`); 
    const getUserData = async () => { 
      console.log("DONE"); 
      // Get User
      const response = await fetch(`/api${pathname}`); 
      const userResponse = await response.json(); 

      console.log(userResponse); 

      setUser(userResponse); 
      setGrades(userResponse.status); 
      setActivity(userResponse.activity); 

      // Check if it is my account
      const id = pathname.split('/')[2]; 
      if(id === session?.user.id)
        setCheckMyProfile(true); 

      console.log(activity); 
      console.log(userResponse); 
    }; 

    getUserData(); 
  }, []); 
  
  const handleEditPost = (post) => { 

  }

  const handleDeletePost = async (post) => { 
    console.log(`api/posts/${post._id}`); 
    await fetch(`api/posts/${post._id}`, { 
      method: "DELETE", 
      mode: 'cors',
      header: { 
        'Content-Type': 'application/json', 
      }
    }); 

    const filteredPosts = user.activity.posts.filter(el => el._id != post._id); 
    setUser({ ...user, 'activity.posts': filteredPosts}); 
    setActivity({ ...activity, posts: filteredPosts});
  }
  return (
    <Profile 
      name = 'My'
      handleEditPost = { handleEditPost }
      handleDeletePost = { handleDeletePost }
      checkMyProfile = { checkMyProfile }
      grades = { grades }
    />
  )
}

export default ProfilePage