'use client'; 
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'

const Profile = ({ name }) => {
  const { data: session } = useSession(); 
  const pathname = usePathname(); 
  const [ user, setUser ] = useState({}); 

  useEffect( () => { 
    const getUserData = async () => { 
      const response = await fetch(`/api${pathname}`); 
      const userResponse = await response.json(); 

      setUser(userResponse); 
      console.log(userResponse); 
    }; 

    getUserData(); 
  }, [])

  return (
    <section>
      User
    </section>
  )
}

export default Profile