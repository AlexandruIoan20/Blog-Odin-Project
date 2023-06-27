'use client'

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
}

const NavBar = () => {
    const { data: session } = useSession(); 

    const [ providers, setProviders ] = useState([]); 
    const [ toggleDropdown, setToggleDropdown ] = useState(false); 

    return (
        <nav className='bg-primary-purple py-1 px-1 flex flex-row w-screen'>
            <Link className="w-fit" href='/'>
                <Image src="logo.svg" width = { 35}  height = {35 } alt="logo" />
            </Link>

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
                                classes = 'bg-green-500'
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