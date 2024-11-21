// components/Landing.js
import Hero from "./Hero";
import VideoCard from "./VideoCard"; // Import the VideoCard component

const Landing = ({ videos, handleVideoClick }) => {
  return (
    <div className="overflow-y-auto h-[calc(100vh)]">
      <Hero
        videoSrc={"./background.mp4"}
        overlayOpts={{
          leftSize: { height: 60, width: 100 },
          rightSize: { height: 30, width: 200 },
        }}
      />

      {/* Start video grid after half the viewport height */}
      <div className="mt-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {videos?.map((video) => (
          <VideoCard
            key={video.name} // Use a unique identifier for each video
            vid={video}
            openVid={() => handleVideoClick(video)} // Pass the video data to the click handler
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;
