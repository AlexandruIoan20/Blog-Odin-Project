'use client'

import { FaBlogger } from 'react-icons/fa'; 
import { IconContext } from 'react-icons';
import Link from "next/link"; 
import Image from "next/image";
import { useState, useEffect } from 'react'; 
import { signIn, signOut, useSession, getProviers } from 'next-auth/react'; 

const AuthButton = ({ executeFunction, classes, name }) => { 
    return ( 
        <button
            onClick = { executeFunction }
            className = { classes }
        >
            { name }
        </button>
    )
}; 

const CustomFaBlogger = () => { 
    return( 
        <IconContext.Provider value = {{ size: 35, color:'#491A74' }}>
            <FaBlogger size = { 35 } /> 
        </IconContext.Provider>
    )
}

const NavBar = () => {
    const { data: session } = useSession(); 

    const [ providers, setProviders ] = useState([]); 
    const [ toggleDropdown, setToggleDropdown ] = useState(false); 

    return (
        <nav className='bg-primary-purple py-1 px-1 flex flex-row w-screen'>
            <CustomFaBlogger /> 

            {/* PC Design */}
            <div className="ml-auto sm:flex hidden"> 
                { session?.user ? 
                    ( 
                        <div> 1 </div>
                    ) 
                    : 
                    ( 
                        <>
                            <AuthButton 
                                name = "Sign In"
                                executeFunction = { () => { }}
                                classes = 'sign-button'
                            /> 
                            <AuthButton 
                                name = 'Log In'
                                executeFunction = { () => { }}
                                classes = 'log-button'
                            /> 
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default NavBar