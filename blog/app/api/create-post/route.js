import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => { 
    const { title, text, userId, visibility } = await req.json(); 
    console.log({ title, text, userId, visibility }); 

    try { 
        await connectToDB(); 
        console.log("Connected in request.")
        const post = new Post({ 
            title: title, 
            text: text, 
            creator: userId, 
            visibility: visibility, 
        }); 

        await post.save(); 
        return new Response('Post created succesfully', { status: 200 }); 
    } catch (err) { 
        return new Response(`Something bad happened on the server side: ${err}`, { status: 500 }); 
    }
}