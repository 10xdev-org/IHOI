import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import { ChevronsLeft } from "lucide-react";
import BackButtons from "./BackButtons";

const VideoViewer = ({ video, onClose }) => {
  const { setScreensaverDisabled } = useScreensaverContext();
  const videoRef = useRef(null);

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Add event listener to close on video end
    const handleVideoEnd = () => {
      onClose(); // Close the modal when the video ends
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
    }

    // Clean up on component unmount: re-enable screensaver and remove event listener
    return () => {
      setScreensaverDisabled(false);
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [video, setScreensaverDisabled, onClose]);

  const formattedSrc = video.src
    ? video.src.replace(/ /g, "%20").replace(/'/g, "%27")
    : null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full bg-black">
        <div
          className="flex-grow overflow-hidden"
          style={{ maxHeight: "calc(100vh)" }}
        >
          <video
            ref={videoRef} // Add ref to the video element
            src={formattedSrc}
            controls
            className="w-full h-full"
            title={video.name}
            autoPlay
          />
        </div>
      </div>
      <BackButtons onBack={onClose} onHome={onClose} />
    </Modal>
  );
};

export default VideoViewer;
