'use client'; 
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'; 
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IconContext } from "react-icons";
import { CommentButton, LikeButton } from "@components/buttons/interaction_buttons";

const CustomHeartInfo = () => {
    return (
        <IconContext.Provider value = {{ size: 20, color: '#BF99F2'}} >
            <AiFillHeart /> 
        </IconContext.Provider>
    )
}

const CustomCommentInfo = () => { 
    return ( 
        <IconContext.Provider value = {{ size: 20, color: '#BF99F2' }}>
            <FaComment /> 
        </IconContext.Provider>
    )
}

const Post = () => {
    const pathName = usePathname(); 
    const [ post, setPost ] = useState();  

    useEffect( () => { 
        console.log(pathName); 
        function extractIdFromPathName () { 
            const path = pathName.split('/'); 
            return path[2].toString(); 
        }; 

        const postId = extractIdFromPathName(); 

        const getPostData = async () => { 
            const response = await fetch(`/api/posts/${postId}`); 
            const postData = await response.json(); 

            console.log(postData); 
            setPost(postData); 
        }
        getPostData(); 
    }, [])

  return (
    <section>
        { post === undefined && 
            <p> Loading...</p>
        }

        { post!= undefined && 
            <>
                <h1 className="global_header"> {post.title} </h1>
                <div className="my-5 bg-slate-200 mb-10 shadow-xl">
                    <ul className="flex gap-x-10 px-2">
                        <li className="flex"> 
                            <span className="flex justify-center items-center mr-1">
                                <CustomHeartInfo />
                            </span> 
                            <p> { post.interaction.likes }  </p> 
                        </li>
                        <li className="flex">
                            <span className="flex justify-center items-center mr-1" >
                                <CustomCommentInfo /> 
                            </span>
                            <p> { post.interaction.comments.length } </p>
                        </li>
                    </ul>
                </div>

                <article className="mx-20 bg-slate-200 shadow-xl p-5">
                    { post.text }
                    <br />
                    <section className="flex gap-x-10 mt-10">
                        <div className="flex">
                            <LikeButton executeFunction={ () => { }}/> 
                            <p> { post.interaction.likes }  </p> 
                        </div>
                        <div className="flex">
                            <CommentButton executeFunction={ () => { }} /> 
                            <p> { post.interaction.comments.length } </p>
                        </div>
                    </section>
                </article>
            </>
        }
    </section>
  )
}

export default Post