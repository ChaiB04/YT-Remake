import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import VideoCard from "../components/VideoCard";
import { Grid, Button, ButtonGroup, Typography, Avatar } from "@mui/material";
import Post from "../domains/Post";
import User from "../domains/User";

function SearchResults() {
    const location = useLocation();
    const searchString = location.state?.searchString;

    const [postResults, setPostResults] = useState<Post[]>([]);
    const [channelResults, setChannelResults] = useState<User[]>([]);
    const [selectedType, setSelectedType] = useState("posts");

    useEffect(() => {
        if (searchString) {
            selectedType === "posts" ? searchPosts() : searchChannels();
        }
    }, [searchString, selectedType]);

    const searchPosts = async () => {
        const response = await PostService.getByTitle(searchString);
        setPostResults(response.data);
    };

    const searchChannels = async () => {
        const response = await UserService.getByUsername(searchString);
        setChannelResults(response.data);
    };

    function getImageSrc(picture: Uint8Array | number[]): string {
        return `data:image/jpeg;base64,${(picture.toString())}`;
    }

    return (
        <Grid marginLeft={20} marginTop={10}>
            <ButtonGroup>
                <Button onClick={() => setSelectedType("posts")} variant={selectedType === "posts" ? "contained" : "outlined"}>
                    Search Posts
                </Button>
                <Button onClick={() => setSelectedType("channels")} variant={selectedType === "channels" ? "contained" : "outlined"}>
                    Search Channels
                </Button>
            </ButtonGroup>

            {selectedType === "posts" && postResults && postResults.length > 0 && postResults.map((post) => (
                <Grid item xs={2} sm={4} md={4} key={post.id} marginTop={5}>
                    <div key={post.id}>
                        <VideoCard video={post} />
                    </div>
                </Grid>
            ))}

            {selectedType === "channels" && channelResults && channelResults.length > 0 && channelResults.map((channel) => (
                <Grid item xs={2} sm={4} md={4} key={channel.id} marginTop={5}>
                    <Avatar
                        alt={channel.username}
                        src={channel.picture ? getImageSrc(channel.picture) : ''}
                        sx={{ width: 150, height: 150, marginBottom: 2 }} />
                    <Typography variant="h5">
                        {channel.username}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
}

export default SearchResults;
