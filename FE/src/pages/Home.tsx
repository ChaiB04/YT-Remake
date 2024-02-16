import { Box, Container, Grid, Paper, styled } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Post from "../domains/Post";
import { AxiosResponse } from "axios";
import PostService from "../services/PostService";
import VideoCard from "../components/VideoCard";
import { Rowing } from "@mui/icons-material";

function index() {

    // const Item = styled(Pper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     // padding: theme.spacing(5),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));


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
            <Grid container wrap="nowrap" width='100vw'>
                <Grid item>
                    <div className={styles.banner}></div>
                </Grid>
                <Grid item>
                    <div className={styles.content}>

                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {allPosts && allPosts.map((video) => {
                                return (
                                    <Grid item xs={2} sm={4} md={4} key={video.id}>
                                        {/* <Item> */}
                                            <div key={video.id}>
                                                <VideoCard video={video} />
                                            </div>
                                        {/* </Item> */}
                                    </Grid>
                                )
                            })}
                        </Grid>

                    </div>
                </Grid>
            </Grid>
            {/* <div className={styles.container}>

                <section className={styles.banner}></section>
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
            </div> */}

        </>
    );
}

export default index;