import { connectToDB } from "@utils/database";
import Post from "@models/post";
import User from "@models/user";

export const DELETE = async(req, res) => { 
    try { 
        await connectToDB(); 
        const updatedUser = await User.findOneAndUpdate({ 'activity.posts': { $in: [req.params.id]}}, { $pull: { 'activity.posts': req.params.id }}); 
        console.log(updatedUser); 

        await Post.findOneAndDelete({ _id: req.params.id }); 
        return new Response("Post deleted succesfully from creator profile and feed", { status: 500 }); 
    } catch (err) { 
        return new Response(`Can't delete the post due to this error: ${err}`, { status: 500 })
    }
}