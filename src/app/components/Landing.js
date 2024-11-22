// components/Landing.js
import Hero from "./Hero";
import VideoCard from "./VideoCard"; // Import the VideoCard component

const Landing = ({ videos, handleVideoClick }) => {
  return (
    <div className="overflow-hidden h-[calc(100vh)]">
      <Hero
        videoSrc={"./background.mp4"}
        overlayOpts={{
          leftSize: { height: 60, width: 100 },
          rightSize: { height: 30, width: 200 },
        }}
      />

      <div className="h-[40vh] flex flex-col items-start justify-center px-16 pb-6 bg-transparent text-gray-700">
        <h1 className="text-lg md:text-xl mb-2">It happens only in</h1>
        <h2 className="text-5xl md:text-7xl font-bold mb-2">INDIA</h2>
        <p className="text-lg md:text-xl italic text-gray-300 max-w-lg p-3 rounded bg-black bg-opacity-30">
          Explore Landmark events and case histories.
        </p>
      </div>

      {/* Start video grid after half the viewport height */}
      <div className="grid grid-cols-4">
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
