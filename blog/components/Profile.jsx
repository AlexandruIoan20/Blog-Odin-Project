'use client'; 
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'; 
import GradesList from './Grade';
import Alert from './Alert';
import Link from 'next/link';
import PostCard from './PostCard';

const BUTTON_GENERAL_CLASSNAME =  `mx-5 text-base font-satoshi bg-light-green px-2 py-1 font-medium 
  rounded-xl hover:rounded-3xl transition-all duration-300 hover:text-xl`; //Class for developer button in profile

const DeveloperButton = ({ name, executeFunction }) => { 
  return ( 
    <button
       onClick = { executeFunction } 
       className = { BUTTON_GENERAL_CLASSNAME }
    >{ name } </button>
  )
}

const DeveloperArea = ({ onShowStats }) => { 
  return ( 
    <div className= 'flex flex-col justify-center content-center ml-auto mr-10'>
        <ul className='flex flex-row'>
          <DeveloperButton name = { 'View Stats' } executeFunction = { onShowStats }  /> 
          <Link href = '/create-post' className= { BUTTON_GENERAL_CLASSNAME }> Create Post </Link>
          <DeveloperButton name = { 'testB' } executeFunction = { () => { }} /> 
        </ul>
    </div>
  )
}; 

const Profile = ({ name, onEditPost, onDeletePost }) => {
  const { data: session } = useSession(); 
  const pathname = usePathname(); 
  const [ user, setUser ] = useState({}); 
  const [ grades, setGrades ] = useState([]); 
  const [ activity, setActivity ] = useState({}); 
  const [ checkMyProfile, setCheckMyProfile ] = useState(false); 
  const [ showStats, setShowStats ] = useState(false); 

  useEffect( () => { 
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


  const handleShowStats = () => { 
    setShowStats((x) => !x); 
  }

  const handleCancel = () => { 
    setShowStats(false); 
  }

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
    <main>
      <div className='inline-flex w-screen flex-row'>
        <h1 className='global_header'> { name } Profile </h1>
        {
          checkMyProfile && 
            <DeveloperArea onShowStats = { handleShowStats } /> 
        } 
      </div>

      <article className='px-5 flex flex-row gap-x-8'>
        { user != {} && 
          <GradesList gradesArray={grades}/>
        }
      </article>
      <hr className='my-2 mx-10'/>

      { showStats && 
        <Alert 
          onCancel= { handleCancel }
          content = { {likes: user?.activity.likesCount, comments: user?.activity.commentsCount }} 
          onExecute = { null }
          profileStatus = { true }
        /> 
      }

      { user?.activity != undefined && user?.activity.posts.length == 0 && checkMyProfile && 
        <Link href = '/create-post' className='default_button'> Create Your First Post </Link>
      }

      { user?.activity != undefined && user?.activity.posts.length > 0 && 
        user.activity.posts.map(post => { 
          return ( 
            <PostCard 
              onDeletePost = { handleDeletePost }
              onEditPost = { handleEditPost }
              key = { post._id }
              dev = { user._id === session?.user.id }
              post = { post }
            /> 
          )
        })
  } 
    </main>
  )
}

export default Profile