import React from 'react'
import {Form,Button} from 'semantic-ui-react';
import {useForm} from '../../utils.js/hooks';
export default function PostForm() {
    const {onSubmit,onChange,values} = useForm({})
    return (
       <Form onSubmit={onSubmit}>
           <h2>Create a Post:</h2>
           <Form.Field>
               <Form.Input placeholder="Hi World" name='body' onChange={onChange} value={values.body}/>
               <Button type='submit' color='teal'>Submit</Button>
           </Form.Field>
       </Form>
    )
}
