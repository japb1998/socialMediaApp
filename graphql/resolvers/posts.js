const Post= require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {AuthenticationError} = require('apollo-server');
module.exports = {
    Query:{
        async getPosts(){
try {
const posts = await Post.find({}).sort({createdAt: -1});
return posts
}catch(error){
throw new Error(error);
}
        },
      async getPost(_,{postID}){
try{
    const post = await Post.findById(postID);
if(post){
    return post
} else {
    throw new Error('Post not found')
}
} catch(err){
    throw new Error(err)
}
      }  
    },
    Mutation:{
        async createPost(_,{body},context){
const user = checkAuth(context);
 const newPost = new Post({
     body,
     user:user.id,
     username:user.username,
     createdAt: new Date().toISOString()
 });
 const post = await newPost.save();
 return post ;
        },
        async deletePost(_,{postID},context){
            const user = checkAuth(context);
            try{
                const post = await Post.findById(postID);
                if(user.username === post.username){
                    await post.delete();
                    return `Post Deleted successfully${post}`
                }else {
throw AuthenticationError('Action not allowed');
                }
            } catch(err){
                throw new Error(err);
            }
        }
    }

}