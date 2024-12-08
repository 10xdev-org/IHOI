"use client";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import VideoViewer from "./components/VideoViewer";
import axios from "axios";

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const PLAYLIST_ID = "PL7FyP3s7bLbIT57CCMR42gxPeN851i8DZ";
  const API_KEY = "AIzaSyBHSv6fT10HfnWHE1NoZhP0j_rU3QV385I";

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: PLAYLIST_ID,
            maxResults: 50,
            key: API_KEY,
          },
        }
      );

      const videosData = response.data.items.map((item) => ({
        name: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        src: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }));

      setVideos(videosData);
    } catch (error) {
      console.error(
        "Failed to fetch videos:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchVideos();

    // Set up interval to fetch videos every 30 minutes
    const interval = setInterval(() => {
      fetchVideos();
    }, 60 * 60 * 1000); // 60 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = (vid) => {
    setSelectedVideo(vid);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  console.log({ videos });

  const naveenJindalVideo = videos.find(
    (vid) => vid.name === "The Tale of a Flag Satyagraha -  Naveen Jindal"
  );
  const restOfVideos = videos.filter(
    (vid) => vid.name !== "The Tale of a Flag Satyagraha -  Naveen Jindal"
  );

  return (
    <div className="flex-grow overflow-hidden">
      <Landing
        handleVideoClick={handleVideoClick}
        videos={restOfVideos}
        naveenJindalVideo={naveenJindalVideo}
      />
      {selectedVideo && (
        <VideoViewer video={selectedVideo || {}} onClose={handleVideoClose} />
      )}
    </div>
  );
}
