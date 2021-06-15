const {ApolloServer,PubSub}  = require('apollo-server');
// Apollo Server use express on the background
const {typeDefs} = require('./graphql/typeDefs')
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
// const pubsub = new PubSub()
const PORT = process.env.port || 5000
const resolvers = require('./graphql/resolvers/index');
// resolver Functions GraphQL

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{ return {req}}
});


mongoose.connect(MONGODB,{useNewUrlParser:true}).then(()=>{
    console.log('MongoDB connected')
return server.listen({port:PORT}).then(res => {
    console.log(`server running ar ${res.url}`);
});
}).catch(err => {
    console.error(err)
})
