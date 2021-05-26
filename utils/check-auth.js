const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');
const {AuthenticationError} = require('apollo-server');
 module.exports = (context) => {
     const authHeader = context.req.headers.authorization;
     if(authHeader){
         const token = authHeader.split('Bearer ')[1];
         if(token){
             try {
                 const user = jwt.verify(token,secretKey);
                 return user;
             } catch(err) {
throw new AuthenticationError('Invalid/ Expired Token') ;
             }
         }
         throw new Error('Authentication token must be \'Bearer[Token]')
     }
     throw new Error('Authentication token must be provided')
 }