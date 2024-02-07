import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PostService from "../services/PostService";
import { AxiosResponse } from 'axios';
import { ChangeEvent } from "react";
import PostType from '../enums/PostType';
import User from '../domains/User';
import Post from '../domains/Post';
import Role from "../enums/Role";
import UserService from "../services/UserService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pako from "pako";
import { toast } from "react-toastify";

function UploadVideo() {
    const accessToken = useSelector((state: any) => state.usertoken);
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        email: '',
        picture: new Uint8Array,
        role: Role.DEFAULT
    });

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [formData, setFormData] = useState<Post>({
        id: null || '',
        title: '',
        picture: new Uint8Array,
        content: '',
        description: '',
        postType: PostType.DEFAULT
    });


    const [videoPreview, setVideoPreview] = useState<string | ArrayBuffer | undefined>(undefined);
    const [videoKey, setVideoKey] = useState(Date.now());
    const [thumbnailPreview, setThumbnailPreview] = useState<string | ArrayBuffer | undefined>(undefined);

    useEffect(() => {
        console.log(accessToken)
        if (!accessToken) {
            navigate("/login")
        }

        fetchUser();
        getVideos();

    }, [accessToken]);

    const fetchUser = async () => {
        try {
            const response = await UserService.getByAccessToken();
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };


    async function getVideos() {
        const response: AxiosResponse<Post[]> = await PostService.getAll();
        const posts = response.data;
        setAllPosts(posts);
    }

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    
        const fileInput = event.target;
        const file = fileInput.files && fileInput.files[0];
    
        if (file) {
            try {
                const reader = new FileReader();
    
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const result = e.target?.result;
    
                    if (result) {
                        let base64String: string;
    
                        if (typeof result === 'string') {
                            base64String = result.split(',')[1]; 
                        } else {
                            const arrayBuffer = result as ArrayBuffer;
                            const uint8Array = new Uint8Array(arrayBuffer);
                            base64String = uint8ArrayToBase64String(uint8Array);
                        }
    
                        setVideoPreview(base64String);
                        setVideoKey(Date.now());
                        setFormData({ ...formData, content: base64String });
                    }
                };
    
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error(error);
                alert("Please select a different file type");
            }
        }
    };
    

    const handleThumbnailSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const fileInput = event.target;
        const file = fileInput.files && fileInput.files[0];

        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const arrayBuffer = e.target?.result;
                    if (arrayBuffer) {
                        setThumbnailPreview(arrayBuffer);
                        const byteArray = new Uint8Array(arrayBuffer as ArrayBuffer);
                        setFormData({ ...formData, picture: byteArray });
                    }
                };

                reader.readAsArrayBuffer(file);
            } else {
                alert("Please select a valid image file for the thumbnail");
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

    const handleSelectChange = (event: SelectChangeEvent<PostType>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value,
        }));
    };

    function bigUint64ArrayToUint8Array(bigUintArray: BigUint64Array): Uint8Array {
        const buffer = new ArrayBuffer(bigUintArray.length * 8);
        const dataView = new DataView(buffer);

        for (let i = 0; i < bigUintArray.length; i++) {
            dataView.setBigUint64(i * 8, bigUintArray[i], true);
        }

        return new Uint8Array(buffer);
    }

    function uint8ArrayToBase64String(uint8Array: Uint8Array): string {
        let binary = '';
        uint8Array.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });

        return btoa(binary);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const pictureBase64 = formData.picture ? uint8ArrayToBase64String(formData.picture) : null

        const postUser: User = {
            id: user.id
        };

        const newPost: object = {
            title: formData.title,
            picture: pictureBase64,
            content: formData.content,
            description: formData.description,
            user: postUser,
            postType: formData.postType,
        };

        console.log(newPost)
        try {
            const response = await PostService.create(newPost);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    function getImageSrc(picture: Uint8Array): string {
        return `data:image/jpeg;base64,${(picture.toString())}`;
    }

    return (
        <>
            <h1>All posts:</h1>
            {allPosts && allPosts.map((video) => {
                return (
                    <div key={video.id}>
                        <video width="640" height="480" controls key={videoKey} {...(video.picture && { poster: getImageSrc(video.picture) })}>
                            {video.content !== undefined && (
                                <source src={video.content} type="video/mp4"/>
                            )}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )
            }

            )}

            <br />
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="postType">Post Type</InputLabel>
                    <Select
                        name="postType"
                        value={formData.postType === PostType.PICTURE ? 1 : 0}
                        onChange={handleSelectChange}
                        label="Post Type"
                    >

                        <MenuItem value={0}>Video</MenuItem>
                        <MenuItem value={1}>Picture</MenuItem>
                    </Select>

                </FormControl>

                <div>
                    <input
                        type="file"
                        name="picture"
                        onChange={handleThumbnailSelect}
                        style={{ display: 'none' }}
                        id="thumbnail-input"
                    />
                    <label htmlFor="thumbnail-input">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{ marginBottom: 1 }}
                        >
                            Upload Thumbnail
                        </Button>
                    </label>

                    {thumbnailPreview && (
                        <div>
                            <img src={URL.createObjectURL(new Blob([thumbnailPreview]))} alt="Thumbnail" width={200} />
                        </div>
                    )}
                </div>

                <div>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="video">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{ marginBottom: 1 }}
                        >
                            Upload Video
                        </Button>
                    </label>

                    {videoPreview && (
                        <div key={videoKey}>
                            <video width="640" height="480" controls key={videoKey}>
                                <source src={`data:video/mp4;base64,${videoPreview}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                </div>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </>
    );
}

export default UploadVideo;
