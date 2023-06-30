'use client'; 
import { useState } from 'react';
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

const Profile = ({ name, handleDeletePost, handleEditPost, checkMyProfile, grades }) => {

  const [ showStats, setShowStats ] = useState(false); 
  const handleShowStats = () => { 
    setShowStats((x) => !x); 
  }

  const handleCancel = () => { 
    setShowStats(false); 
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