'use client'; 
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'; 
import GradesList from './Grade';
import Alert from './Alert';

const DeveloperButton = ({ name, executeFunction }) => { 
  return ( 
    <button
       onClick = { executeFunction } 
       className = { `mx-5 text-base font-satoshi bg-light-green px-2 py-1 font-medium rounded-xl hover:rounded-3xl transition-all duration-300 hover:text-xl` } 
    >{ name } </button>
  )
}

const DeveloperArea = ({ onShowStats }) => { 
  return ( 
    <div className= 'flex flex-col justify-center content-center ml-auto mr-10'>
        <ul className='flex flex-row'>
          <DeveloperButton name = { 'View Stats' } executeFunction = { onShowStats }  /> 
          <DeveloperButton name = { 'testB' } executeFunction = { () => {  }} /> 
          <DeveloperButton name = { 'testB' } executeFunction = { () => { }} /> 
        </ul>
    </div>
  )
}; 

const Profile = ({ name }) => {
  const { data: session } = useSession(); 
  const pathname = usePathname(); 
  const [ user, setUser ] = useState({}); 
  const [ grades, setGrades ] = useState([]); 
  const [ checkMyProfile, setCheckMyProfile ] = useState(false); 
  const [ showStats, setShowStats ] = useState(false); 

  useEffect( () => { 
    const getUserData = async () => { 
      // Get User
      const response = await fetch(`/api${pathname}`); 
      const userResponse = await response.json(); 

      // Check if it is my account
      const id = pathname.split('/')[2]; 
      if(id === session?.user.id)
        setCheckMyProfile(true); 

      // Set user state
      setUser(userResponse); 
      setGrades(userResponse.status); 
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
    </main>
  )
}

export default Profile