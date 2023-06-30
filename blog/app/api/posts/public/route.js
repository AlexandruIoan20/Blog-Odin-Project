import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, res) => { 
    try { 
        await connectToDB();
        const posts = await Post.find({ visibility: 'public'}).populate('creator'); 

        if(posts.length === 0) { 
            return new Response("No posts available", { status: 200 }); 
        }

        return new Response(JSON.stringify(posts), {status: 200}); 
    } catch (err) { 
        return new Reponse(`Cannot get any post due to some errors: ${err}`, { status: 500 }); 
    }
}