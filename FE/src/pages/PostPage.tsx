import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PostType from '../enums/PostType';
import PostService from "../services/PostService";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null || '',
    title: '',
    picture: new Uint8Array,
    content: '',
    description: '',
    postType: PostType.DEFAULT,
    user: {
      id: ''
    }
  });

  const fetchPost = async () => {
    try {
      if (id) {
        const response = await PostService.get(id);
        setPost(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  function getImageSrc(picture: Uint8Array): string {
    return `data:image/jpeg;base64,${(picture.toString())}`;
  }

  return (
    <Grid container spacing={3} justifyContent="flex-start">
      <Grid item xs={12} md={13}>
        <Card style={{ textAlign: 'left', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '16px' }}>
          <CardContent>
            <Typography variant="h4" component="div" style={{ marginBottom: '12px' }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <video width="640" height="480" controls key={Date.now()} {...(post.picture && { poster: getImageSrc(post.picture) })}>
                {post.content !== undefined && (
                  <source src={post.content} type="video/mp4" />
                )}
                Your browser does not support the video tag.
              </video>
            </Typography>
            <Typography variant="body1" paragraph style={{ marginTop: '12px' }}>
              {post.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

}

export default PostPage;
