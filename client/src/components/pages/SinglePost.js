import React,{useContext} from 'react';
import {gql,useQuery} from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from 'moment';
import LikeButton from './LikeButton';
// import { FETCH_POSTS_QUERY } from '../../utils.js/graphql';
import {AuthContext} from '../../context/auth';

export default function SinglePost(props) {
    const postId = props.match.params.postId;
    console.log(postId);
    const{ user} = useContext(AuthContext)
    const {data,loading} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId: postId
        }
    });
    
    let postMarkup;
    if(loading){
        postMarkup = <p>Loading Post...</p>
    } else {
       const {id,body,createdAt,username,comments,likes,likeCount,commentCount } = data.getPost;
       postMarkup = (
           <Grid>
               <Grid.Row>
                   <Grid.Column width={2}><Image floated="right"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"></Image></Grid.Column>
 <Grid.Column width={10}>
     <Card fluid>
         <Card.Content>
             <Card.Header>{username}</Card.Header>
             <Card.Meta>
{moment(createdAt).fromNow()}
             </Card.Meta>
       <Card.Description>{body}</Card.Description>
         </Card.Content>
         <hr/>
         <Card.Content extra>
             <LikeButton user={user} post ={{id,likeCount,likes}}></LikeButton>
             <Button as='div' labelPosition='right' onClick={()=> console.log('comment')}>
                 <Button basic color='blue'>
                     <Icon name='comments'/>
       <Label basic color='blue' pointing='left'>{commentCount}</Label>
                 </Button>
             </Button>
         </Card.Content>
     </Card>
 </Grid.Column>
               </Grid.Row>
           </Grid>
       )
    }
    // if()
    return (
        <div>
            
        </div>
    )
}

const FETCH_POST_QUERY = gql`query getPost($postId:ID!){
    getPost(postID:$postId){
        id
        body
        createdAt username likeCount likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}`