import React,{useState} from 'react'
import { Form,Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { Route , withRouter} from 'react-router-dom';
 function Register({history}) {
    const [errors,setErrors]= useState('')
    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [addUser, { loading}] = useMutation(REGISTER_USER,{
        update(proxy,result){
            history.push('/');
        }, 
        onError(err) {
            
            setErrors(err.graphQLErrors[0].extensions.errors);
            console.log(err.graphQLErrors[0].extensions.errors)
           
          },
        variables: values

    });
    function onChange ({target}) {
const {value,name} = target;
setValues({
    ...values, [name]: value 
})
console.log(values);
    }
    function onSubmit(e){
        e.preventDefault();
addUser();
    }
   
    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : '' }>
                <h1>Register</h1>
            <Form.Input label='Username' placeholder='Username' name='username' error={errors.username ? true : false}value={values.username} onChange={onChange} type='text' />
            <Form.Input label='E-mail' placeholder='E-mail' value={values.email}  error={errors.email ? true : false}onChange={onChange} name='email'type='text' />
            <Form.Input label='Password' placeholder='Password'  name='password' error={errors.password ? true : false}onChange={onChange} value={values.password}type='password' />
            <Form.Input label='Confirm Password' placeholder='confirm-password' error={errors.confirmPassword ? true : false}onChange={onChange} value={values.confirmPassword} name='confirmPassword' type='password' />
            <Button type='submit' primary>Register</Button>
                    </Form>
                    {Object.keys(errors).length > 0 &&
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                            </div> }
        </div>
    )
}
const REGISTER_USER = gql`
mutation register($username:String!
$email:String!
$password:String!
$confirmPassword:String!){
    register(
        registerInput:{
        username:$username
        email:$email
        password:$password
        confirmPassword:$confirmPassword
        }
    ){
        id email username createdAt token
    }
}
`
export default withRouter(Register);