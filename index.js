const {ApolloServer,PubSub}  = require('apollo-server');
// Apollo Server use express on the background
const {typeDefs} = require('./graphql/typeDefs')
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const pubsub = new PubSub()

const resolvers = require('./graphql/resolvers/index');
// resolver Functions GraphQL

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{ return {req,pubsub}}
});


mongoose.connect(MONGODB,{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected')
return server.listen({port:5000}).then(res => {
    console.log(`server running ar ${res.url}`);
});
})
