import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomVideoPlayer from "../components/CustomVideoPlayer";
import { FaRegStar, FaStar } from "react-icons/fa";
import "../styles/VideoPlayerPage.css";
import type {iVideo} from "../../interfaces/iVideo.ts";


const VideoPlayer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [video, setVideo] = useState<iVideo | null>(null);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/videos", { credentials: "include" })
            .then((res) => res.json())
            .then((data: iVideo[]) => {
                const found = data.find((v) => v.id === id);
                setVideo(found || null);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleLike = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };

    if (!video) return <h1>Відео не знайдено!</h1>;

    return (
        <div className="video-player-wrapper">
            <h1>{video.title}</h1>
            <CustomVideoPlayer src={encodeURI(`http://localhost:3000/public${video.src}`)} />


            <div className="video-meta">
                <div className="video-author">{video.author}</div>
                <button onClick={handleLike}>
                    {isLiked ? <FaStar /> : <FaRegStar />} {likes}
                </button>
            </div>

            <div className="video-space" />

            <div className="video-description">
                <p>{video.description}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;
