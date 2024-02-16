import React, { useEffect, useState } from "react";
import User from "../domains/User";
import PostType from "../enums/PostType";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";


interface VideoProps {
    video: {
        id?: string,
        title?: string ,
        picture?: Uint8Array,
        creator?: User,
        postType?: PostType
    }
}


const VideoCard: React.FC<VideoProps> = (props) => {

    const navigate = useNavigate();
    const [creator, setCreator] = useState<User>();



    function getImageSrc(picture: Uint8Array | number[]): string {
        return `data:image/jpeg;base64,${(picture.toString())}`;
    }

    useEffect(() => {
        fetchCreator();
    }, []);

    async function fetchCreator() {
        try {
            console.log(props.video.creator?.id)
            const response = await UserService.get(props.video.creator?.id || "");
            console.log(response.data)
            setCreator(response.data); 
        } catch (error) {
            console.error('Error fetching creator:', error);
        }
    }
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={creator?.picture ? getImageSrc(creator.picture) : undefined} aria-label="recipe" />
                }
                title={props.video.title}
                subheader="September 14, 2016"
                onClick={() => navigate("posts/" + props.video.id)}
            />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.video.picture && getImageSrc(props.video.picture)}
                    alt="Paella dish"
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>

        </>
    );
}

export default VideoCard;