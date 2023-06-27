import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({ 
    title: { 
        type: String, 
        required: [true, 'Title is required!'], 
    }, 
    text: { 
        type: String, 
        required: [true, 'String is required'], 
    }, 
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    }, 

    interaction: { 
        likes: { 
            type: Schema.Types.Number, 
            default: 0, 
        }, 
        comments: { 
            type: Schema.Types.ObjectId, 
            ref: "Comment", 
        }
    }
}); 

const Post = models.Post || model('Post', PostSchema); 
export default Post;