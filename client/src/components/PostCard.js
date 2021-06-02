import React from 'react'
import {Card,Icon,Label,Image} from 'semantic-ui-react';
import moment from 'moment';
export default function PostCard(props) {
    const { username,createdAt,body} = props.post
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
    <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
<p>buttoms</p>
      </Card.Content>
    </Card>
        </div>
    )
}
