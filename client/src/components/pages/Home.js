import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Grid, Image } from 'semantic-ui-react';
import PostCard from '../PostCard';
 function Home() {
    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);
  return (
    <div>
   
  <Grid columns={3} >
  <Grid.Row className='page-title'>
      <h1>Recent Post</h1>
  </Grid.Row>
    <Grid.Row>
     {loading ? <h1>Loading post</h1> : (
         data.getPosts && data.getPosts.map(post => (
<Grid.Column key={post.id}>
    <PostCard post={post}></PostCard>
</Grid.Column>
         )
     ))}
    </Grid.Row>
    </Grid>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;