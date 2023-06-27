'use client'; 

import { BsGithub }  from  'react-icons/bs'; 
import { IconContext } from 'react-icons';

const CustomBsGitHub = () => {
      return ( 
        <IconContext.Provider value = {{ size: 25, color:'#491A74' }}>
            <BsGithub size = { 25 } /> 
        </IconContext.Provider>
      )
}

const Footer = () => {
  return (
    <footer className='fixed bottom-0 bg-primary-purple w-screen inline-flex justify-center py-2'>
        <CustomBsGitHub /> 
        <p className='ml-1 flex content-center'> Made by AlexIoan</p>
    </footer>
  )
}

export default Footer; 