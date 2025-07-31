import React, { useEffect, useState } from "react";
import "../styles/Videos.css";
import type {iVideo} from "../../interfaces/iVideo.ts";


const Videos: React.FC = () => {
    const [category, setCategory] = useState<string | null>(null);
    const [videos, setVideos] = useState<iVideo[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/videos", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setVideos(data))
            .catch((err) => console.log(err));
    }, []);

    const filteredVideos = videos.filter(
        (video) => !category || video.category === category
    );


    return (
        <div className="videos-wrapper">
            <div className="categories">
                <button className="AllButton" onClick={() => setCategory(null)}>Всі</button>
                <button className="TravellingButton" onClick={() => setCategory("travel")}>Подорожі</button>
                <button className="GamesButton" onClick={() => setCategory("games")}>Ігри</button>
                <button className="MusicButton" onClick={() => setCategory("music")}>Музика</button>
            </div>

            <div className="video-grid">
                {filteredVideos.map((video) => (
                    <a className="video-link" key={video.id} href={`/video/${video.id}`}>
                        <img src={encodeURI(`http://localhost:3000/public${video.image}`)} alt={video.title} width="200" />
                        <p>{video.title}</p>
                        <p>{video.author}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Videos;
