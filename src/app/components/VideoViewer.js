// components/VideoViewer.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import { ChevronsLeft } from "lucide-react";

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

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold p-4 h-[50px]">{video.name}</h2>
        <div
          className="flex-grow overflow-hidden"
          style={{ maxHeight: "calc(100vh)" }}
        >
          <video
            src={video.path}
            controls
            className="w-full h-full"
            title={video.name}
            autoPlay
          />
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-32 h-32 flex items-center justify-center hover:bg-black/70 focus:outline-none focus:ring focus:ring-white"
        style={{
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
          width: "8vh",
          height: "16vh",
          left: "0px", // Ensures the circular part sticks out
        }}
      >
        <ChevronsLeft className="w-10 h-10 transform -translate-x-2" />
      </button>
    </Modal>
  );
};

export default VideoViewer;
