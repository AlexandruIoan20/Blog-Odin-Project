'use client'

import Form from "@components/Form"; 
import { useState, useEffect } from 'react'; 
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePage = () => {
    const searchParams = useSearchParams(); 
    const POST_ID = searchParams.get('id'); 

    const router = useRouter(); 
    const [submitting, setSubmitting] = useState(false); 
    const [post, setPost] = useState({}); 

    useEffect( () => { 
      async function getPostData () { 
        try { 
          const response = await fetch(`/api/posts/${POST_ID}`, { 
            method: 'GET'
          }); 

          const postResponse = await response.json(); 
          console.log(postResponse); 
          setPost(postResponse); 
        } catch(err) { 
          console.error(err); 
        }
      }

      getPostData(); 
    }, [])

    const editPost = async (e) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        try { 
          const response = await fetch(`/api/posts/${POST_ID}`, { 
            method: 'PATCH', 
            mode: 'cors', 
            body: JSON.stringify({  
              title: post.title, 
              visibility: post.visibility, 
              text: post.text, 
            }), 
            header: { 
              'Content-Type': 'application/json'
            }
          }); 

          if(response.ok) { 
            router.push('/'); 
          }
        } catch(err) { 
          console.error(err); 
        } finally { 
          setSubmitting(false); 
        }
    }
  return (
    <section>
        <Form 
            type = 'Edit'
            submitting = { submitting }
            post = { post }
            setPost = { setPost }
            handleSubmit = { editPost }
        /> 
    </section>
  )
}

export default UpdatePage