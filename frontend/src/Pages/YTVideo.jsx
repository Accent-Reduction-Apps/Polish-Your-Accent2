import React from "react";
import YouTube from "react-youtube";
import "../styles/YTVideo.css";

const YTVideo = ({ videoId }) => {
    const opts = {
        height: "360",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="video-container">
            <YouTube videoId={videoId} opts={opts} className="video-player" />
        </div>
    );
};

export default YTVideo;
