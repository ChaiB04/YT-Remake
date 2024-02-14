import { Box, Container, Grid, Paper, styled } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Post from "../domains/Post";
import { AxiosResponse } from "axios";
import PostService from "../services/PostService";
import VideoCard from "../components/VideoCard";

function index() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    const [allPosts, setAllPosts] = useState<Post[]>([]);

    useEffect(() => {
        getVideos();
    }, [])

    async function getVideos() {
        const response: AxiosResponse<Post[]> = await PostService.getAll();
        const posts = response.data;
        setAllPosts(posts);
    }


    return (
        <>

            <div className={styles.container}>

                {/* <div className={styles.banner}></div> */}
                <div className={styles.content}>

                    <Grid container spacing={2} className={styles.videocontainer}>
                        {allPosts && allPosts.map((video) => {
                            return (
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Item>
                                        <div key={video.id}>
                                            <VideoCard video={video} />
                                        </div>
                                    </Item>
                                </Grid>
                            )
                        })}
                    </Grid>

                </div>
            </div>

        </>
    );
}

export default index;