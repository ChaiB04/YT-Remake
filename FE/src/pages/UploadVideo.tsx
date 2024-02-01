import { useEffect, useState } from "react";
import PostService from "../services/PostService";
import { AxiosResponse } from 'axios';
import { ChangeEvent } from "react";
import PostType from '../enums/PostType'
import User from '../domains/User'
import Post from '../domains/Post'
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/Store";

function UploadVideo() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [formData, setFormData] = useState<Post>({
        id: null || '',
        title: '',
        picture: [],
        // content: [],
        description: '',
        user: { id: '' } as User,
        postType: PostType.DEFAULT
    });



    useEffect(() => {
        getVideos();
    }, [])

    async function getVideos() {
        const response: AxiosResponse<Post[]> = await PostService.getAll();
        const posts = response.data;
        setAllPosts(posts);

    }


    // const openFileExplorer = () => {
    //     const input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = ".jpg,.jpeg,.mp4";
    //     input.onchange = handleFileSelect;
    //     input.click();
    // };

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>)  => {
        event.preventDefault();

        const fileInput = event.target;
        const file = fileInput.files && fileInput.files[0];

        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/jpg") {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const arrayBuffer = e.target?.result;
                    const byteArray = new BigUint64Array(arrayBuffer as ArrayBuffer);
                    // const base64String = btoa(String.fromCharCode.apply(null, byteArray));

                    setFormData({ ...formData, content: byteArray });
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert("Please select a file of type JPG or JPEG.");
            }
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const user: User = {
            id: formData.user?.id
        }

        const newPost: Post = {
            title: formData.title,
            picture: formData.picture,
            content: formData.content,
            description: formData.description,
            user: user,
            postType: formData.postType,
        };

        const response = await PostService.create(newPost);
        console.log(response)
    }


    return (
        <>
            <h1>ALL POSTS</h1>
            {allPosts.map((post: Post) => {
                return (
                    <>
                        {post.id}
                    </>
                )
            })}
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Post Type:
                    <select
                        name="postType"
                        value={formData.postType}
                        onChange={handleInputChange}
                    >
                        <option value={PostType.VIDEO}>Video</option>
                        <option value={PostType.PICTURE}>Picture</option>
                    </select>
                </label>

                <label>
                    Picture Property:
                    <input
                        type="text"
                        name="pictureProperty"
                        // value={formData.picture}
                        onChange={handleInputChange}
                    />
                </label>

                <label htmlFor="video">Select a video file:</label>
                <input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={handleFileSelect}
                />
                <button type="submit">Submit</button>
            </form></>
    );
}

export default UploadVideo;