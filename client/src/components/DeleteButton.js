import React,{useState} from 'react'
import { Icon,  Button, Confirm} from "semantic-ui-react";
import {useMutation , gql } from '@apollo/client';
export default function DeleteButton(props) {
const [confirmOpen,setConfirmOpen]= useState(false);

const [deletePost] = useMutation(DELETE_POST_MUTATION,{
    update(){

    },
    variables:{
postId
    }
})
    return (
        <>
        <Button
              as="div"
              color="red"
              floated="right"
              onClick={() => console.log("delete post")}
            >
              <Icon name="trash" style={{ margin: 0 }}></Icon>
            </Button>
            <Confirm open={confirmOpen} onCancel={()=> setConfirmOpen(false)} onConfirm={()=>{ 
                deletePost
            }}></Confirm>
            </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId:ID!){
    deletePost(postId:$postId)
}`