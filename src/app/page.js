"use client";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import VideoViewer from "./components/VideoViewer";
import { useScreensaverContext } from "./ScreensaverContext";

export default function Page() {
  // const { appContent } = useScreensaverContext();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [appContent, setAppContent] = useState([]);

  useEffect(() => {
    async function fetchContents() {
      const response = await fetch("/api/get-contents");
      const data = await response.json();
      setAppContent(data);
    }
    fetchContents();
  }, []);

  console.log(appContent);

  const handleVideoClick = (vid) => {
    setSelectedVideo(vid);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="flex-grow overflow-hidden pb-12">
      <Landing handleVideoClick={handleVideoClick} videos={appContent.videos} />
      {selectedVideo && (
        <VideoViewer video={selectedVideo || {}} onClose={handleVideoClose} />
      )}
    </div>
  );
}
