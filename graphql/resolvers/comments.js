const Post = require('../../models/Post');
const { UserInputError,AuthenticationError } = require('apollo-server');
const checkAuth = require('../../utils/check-auth')
module.exports = {
    Mutation:{
        createComment: async (_,{ postId, body} , context) => {
const {username} = checkAuth(context);
if(body.trim() ===''){
    throw UserInputError('Empty comment' , {
        errors:{
            body:'comment body must not be empty'
        }
    })
}
const post = await Post.findById(postId);

if(post){
    post.comments.unshift({
       body,
       username,
        createdAt: new Date().toISOString(),
    });

    await post.save();
    return post
} else throw new UserInputError('Post not found');
        },
        deleteComment: async (_,{postID,commentId},context) =>{
         const {username} = checkAuth(context);
         const post = await Post.findById(postID);
         //if post exist
            if(post){
                //comment index on the comments array on mongoDB
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);

                if(post.comments[commentIndex].username === username){
                    //if the user is the owner of the comment
                    post.comments.splice(commentIndex,1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('action not allowed');
                }
            } else { 
                throw new UserInputError('Post not found');
            }

        }
    }
}