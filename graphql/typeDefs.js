const { gql } =require('apollo-server');
//we set up the types here
module.exports = { typeDefs :gql`
type Post{
    id:ID!
    body:String!
    createdAt:String!
    username:String!
}
type User{
    id:ID!
    email:String! 
    token:String! 
    username:String! 
    createdAt:String!
}
input RegisterInput{
    username:String!
    password:String!
    confirmPassword:String!
    email:String!
}
type Query{
    getPosts:[Post]
    getPost(postID:ID!):Post!
}
type Mutation{
    register(registerInput:RegisterInput):User
    login(username:String!,password:String!):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
}
`}

//in type defs you define what a route will return 
//then in revolvers what they actually do