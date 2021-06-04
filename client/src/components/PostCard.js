import React from 'react'
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';
export default function PostCard(props) {
    const { username,createdAt,body,id,likeCount,commentCount} = props.post;
    const likePost = ()=>{
console.log('like Post')
    }
    const commentOnPost = ()=>{
console.log('comment on post')
    }
    return (
        <div>
            <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
    <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal'>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button color='blue'>
        <Icon name='comments' />
       Comment
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
        </div>
    )
}
