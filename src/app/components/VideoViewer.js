// components/VideoViewer.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import { ChevronsLeft } from "lucide-react";
import BackButtons from "./BackButtons";

const VideoViewer = ({ video, onClose }) => {
  const { setScreensaverDisabled } = useScreensaverContext();

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Clean up on component unmount: re-enable screensaver and revoke object URL
    return () => {
      setScreensaverDisabled(false);
    };
  }, [video, setScreensaverDisabled]);

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
