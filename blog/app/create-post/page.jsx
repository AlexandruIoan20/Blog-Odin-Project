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

    const handleSubmit = async (e) => { 
      e.preventDefault(); 
      setSubmitting(true); 

      console.log(post); 
      try { 
        const response = await fetch('api/create-post',{ 
          method: 'POST', 
          mode: 'cors', 
          body: JSON.stringify({ 
            title: post.title, 
            userId: session?.user.id, 
            text: post.text, 
            visibility: post.visibility, 
          }), 
        }); 

        if(response.ok) { 
          router.push("/"); 
        }
      } catch (err) {
        console.log("We have an error")
        console.error(err); 
      } finally { 
        setSubmitting(false); 
      }
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