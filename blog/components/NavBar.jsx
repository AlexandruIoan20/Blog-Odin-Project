'use client'

import { FaBlogger } from 'react-icons/fa'; 
import { IconContext } from 'react-icons';
import Link from "next/link"; 
import Image from "next/image";
import { useState, useEffect } from 'react'; 
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'; 

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

    useEffect( () => { 
        const setGlobalProviders = async () => { 
            const response = await getProviders(); 
            setProviders(response); 
            console.log({ response} ); 
        }

        setGlobalProviders(); 
    }, []); 

    useEffect( () => { 
        console.log(session?.user); 
    }, [session])

    return (
        <nav className = 'bg-primary-purple py-1 px-1 flex flex-row w-screen'>
            <Link href = "/">
                <CustomFaBlogger /> 
            </Link>

            {/* PC Design */}
            <div className = "ml-auto sm:flex hidden"> 
                { session?.user ? 
                    ( 
                        <>
                            <AuthButton 
                                name = 'Sign Out'
                                executeFunction={ signOut }
                                classes = 'sign-button text-xs' 
                            /> 

                            <Link href = { `/users/${session?.user.id}`}>
                                <Image
                                    src = { session?.user.image } 
                                    alt = "profile_image"
                                    width = { 35 }
                                    height = { 35 }
                                    className = 'rounded-3xl ml-3'
                                />
                            </Link>
                        </>
                    ) 
                    : 
                    ( 
                        <>
                            { providers && 
                                Object.values(providers).map(provider => { 
                                    return ( 
                                        <AuthButton 
                                        name = "Sign In"
                                        executeFunction = { () => { signIn(provider.id) }}
                                        classes = 'sign-button'
                                    /> 
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default NavBar