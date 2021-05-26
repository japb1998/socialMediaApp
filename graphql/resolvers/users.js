const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../../config');
const {UserInputError} = require('apollo-server');
const {validateRegisterInput,validateLoginInput} = require('../../utils/validators');
//generating new token signature
function generateToken(user){
  return   jwt.sign({
        id: user.id,
        email: user.email,
        username:user.username
    },secretKey,{expiresIn:'1h'});
}

//mutation object for the users resolvers
module.exports = {
    Mutation:{
        async login(parent,{username,password}){
            const {valid,errors} = validateLoginInput(username,password);
//validating input
            if(!valid)
            {
                throw new UserInputError('Wrong credentials',{errors})
            }
            //checking that this user exist
            const user = await User.findOne({username});
            if(!user){
                errors.general = 'User not found';

                throw new UserInputError('Wrong Credentials',{errors});

            }
//matching the password with the one in the Db
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                errors.general = 'Wrong Credentials';

                throw new UserInputError('Wrong Credentials',{errors});

            }
//generating new token with jwt 
            const token = generateToken(user);
            return{
                ...user._doc ,
                id:user.id, 
                token,
            }

        },

        async register(parent,{registerInput:{username,email,password,confirmPassword}},context,info){
            //hashing the password before it gets to the data base
            
        
//Validate user input 
const {errors,valid} = validateRegisterInput(username,email,password,confirmPassword);
if(!valid){
    throw new UserInputError('Errors',{errors})
}
//makin sure there is no other user with the same username
console.log(username);
const user = await User.findOne({username})

if(user){
throw new UserInputError('Username is taken',{
    errors:{
        username:'this username is taken'
    }
})
}

password =await bcrypt.hash(password,12);

            //creating a new User base in out mongoose Model
            const newUser =  new User({
                email, 
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res =await newUser.save();
//getting the user Signed and getting the token
            const token = generateToken(res);

            return{
                ...res._doc ,
                id:res.id, 
                token,
            }
        }
    }
}