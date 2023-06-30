'use client'; 

import Form from "@components/Form"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = () => {
    const { data: session } = useSession(); 
    const router = useRouter (); 

    const [submitting, setSubmitting ] = useState(false); 
    const [post, setPost] = useState({}); 

    const handleSubmit = () => { 

    }

  return (
    <Form 
        type = 'Create' 
        submitting = { submitting } 
        post = { post } 
        setPost = { setPost } 
        handleSubmit = { handleSubmit } 
    />
  )
}

export default CreatePost