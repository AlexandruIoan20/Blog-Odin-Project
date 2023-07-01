import { connectToDB } from "@utils/database";
import Post from "@models/post";
import User from "@models/user";

export const DELETE = async(req, { params }) => { 
    try { 
        console.log(params); 
        await connectToDB(); 
        const updatedUser = await User.findOneAndUpdate({ 'activity.posts': { $in: [params.id]}}, { $pull: { 'activity.posts': params.id }}); 
        console.log(updatedUser); 

        await Post.findOneAndDelete({ _id: params.id }); 
        console.log('Deleted'); 
        return new Response("Post deleted succesfully from creator profile and feed", { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(`Can't delete the post due to this error: ${err}`, { status: 500 })
    }
}