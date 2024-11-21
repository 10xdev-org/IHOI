"use client";
import { useState } from "react";
import Landing from "./components/Landing";
import VideoViewer from "./components/VideoViewer";
import { useScreensaverContext } from "./ScreensaverContext";

export default function Page() {
  const { appContent } = useScreensaverContext();
  const [selectedVideo, setSelectedVideo] = useState(null);

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
