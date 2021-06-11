import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from './pages/LikeButton';
import DeleteButton from './DeleteButton';


export default function PostCard(props) {
  const { username, createdAt, body, id, likeCount,likes, commentCount } = props.post;
  const { user } = useContext(AuthContext);
  const likePost = () => {
    console.log("like Post");
  };
  const commentOnPost = () => {
    console.log("comment on post");
  };
  return (
    <div>
      <Card fluid style={{ marginBottom: 5 }}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/post/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
         <LikeButton user={user} post={{id,likeCount,likes}}/>
          <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
             
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.username === username && (
           <DeleteButton postId={id}/>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
