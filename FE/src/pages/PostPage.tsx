import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostType from '../enums/PostType';
import PostService from "../services/PostService";
import { Grid, Avatar, Typography, IconButton, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styles from '../styles/PostPage.module.css'
import UserService from "../services/UserService";

function PostPage() {
  const fakeLikes = 1098;
  const fakeDislikes = 3;

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: null || '',
    title: '',
    picture: new Uint8Array,
    content: '',
    description: '',
    postType: PostType.DEFAULT,
  });

  const [postCreator, setPostCreator] = useState({
    id: '',
    username: '',
    picture: new Uint8Array
  })

  const fetchPost = async () => {
    try {
      if (id) {
        const postResponse = await PostService.get(id);
        setPost(postResponse.data);
        console.log(postResponse.data)

        const postCreatorResponse = await UserService.get(postResponse.data.creator.id)
        setPostCreator(postCreatorResponse.data)
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const navigateToCreatorProfile = () => {
    navigate(`/profile/${postCreator.id}`)
  }

  function getImageSrc(picture: Uint8Array): string {
    return `data:image/jpeg;base64,${(picture.toString())}`;
  }

  return (
    <Grid container spacing={3} justifyContent="flex-start" marginTop={10}>
      <Grid item xs={12} md={13}>
        <div className={styles.videoContainer}>
          <Typography variant="body2" color="primary" >
            <video width="800" height="500" controls key={Date.now()} {...(post.picture && { poster: getImageSrc(post.picture) })}>
              {post.content !== undefined && (
                <source src={post.content} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>
          </Typography>
          <Typography variant="h5" component="div" style={{ marginBottom: '20px' }}>
            <b>{post.title}</b>
          </Typography>
          <div className={styles.creatorContainer}>
            <div className={styles.creatorInfo} onClick={navigateToCreatorProfile}>
              <Avatar
                alt={postCreator.username}
                src={postCreator.picture ? getImageSrc(postCreator.picture) : ''}
                className={styles.profileAvatar}
                sx={{ width: 50, height: 50, marginRight: 2 }}
              />
              <Typography variant="body1" paragraph>
                <b>{postCreator.username}</b>
              </Typography>
            </div>
            <div>
              <Button variant="contained" color="primary" size="small">
                Subscribe
              </Button>
            </div>
          </div>
          <div className={styles.likesButtonsContainer}>
            <IconButton color="default" aria-label="like">
              <ThumbUpIcon /> <p>{fakeLikes}</p>
            </IconButton>
            <IconButton color="default" aria-label="dislike">
              <ThumbDownIcon /> <p>{fakeDislikes}</p>
            </IconButton>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f0f0f0', padding: '16px' }}>
            <Typography variant="body1" paragraph>
              {post.description}
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );


}

export default PostPage;
