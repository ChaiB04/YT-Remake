import { Grid } from "@mui/material";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Post from "../domains/Post";
import { AxiosResponse } from "axios";
import PostService from "../services/PostService";
import VideoCard from "../components/VideoCard";
import CircularProgress from '@mui/material/CircularProgress';

function index() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getVideos();
            setLoading(false);
        }, 2000);

    }, [])

    async function getVideos() {
        const response: AxiosResponse<Post[]> = await PostService.getAll();
        const posts = response.data;
        setAllPosts(posts);
    }


    return (
        <>
            <Grid container wrap="nowrap" className={styles.container}>
                <Grid item>
                    <div className={styles.banner}></div>
                </Grid>
                <Grid item>
                    <div className={styles.content}>


                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} paddingTop={5} paddingLeft={3}>
                                {allPosts && allPosts.map((video) => {
                                    return (
                                        <Grid item xs={2} sm={4} md={4} key={video.id} >
                                            <div key={video.id}>
                                                <VideoCard video={video} />
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}


                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default index;