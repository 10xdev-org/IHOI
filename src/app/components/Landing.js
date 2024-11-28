// components/Landing.js
import Hero from "./Hero";
import VideoCard from "./VideoCard"; // Import the VideoCard component

const Landing = ({ videos, naveenJindalVideo, handleVideoClick }) => {
  return (
    <div className="overflow-hidden h-[calc(100vh)]">
      <Hero
        videoSrc={"./background.mp4"}
        overlayOpts={{
          leftSize: { height: 60, width: 100 },
          rightSize: { height: 30, width: 200 },
        }}
      />
      <div className="flex flex-row items-center justify-between h-[40vh]">
        {/* <VideoCard
          key={video.name} // Use a unique identifier for each video
          vid={video}
          openVid={() => handleVideoClick(video)} // Pass the video data to the click handler
        /> */}
        <div className="h-[40vh] w-full grid grid-cols-4 items-start justify-between py-16 bg-transparent text-gray-700 gap-4">
          {/* First three columns for text */}
          <div className="col-span-2 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-lg md:text-xl">It happens only in</h1>
            <h2 className="text-5xl md:text-7xl font-bold">INDIA</h2>
            <p className="text-lg md:text-xl italic text-gray-300 max-w-lg p-3 rounded bg-black bg-opacity-30 text-center">
              Explore Landmark events and case histories.
            </p>
          </div>
          <div className="col-span-1"> </div>

          {/* Fourth column for VideoCard */}
          {naveenJindalVideo && (
            <div className="flex items-center justify-center">
              <VideoCard
                key={naveenJindalVideo?.name} // Use a unique identifier for each naveenJindalVideo
                name={naveenJindalVideo?.name}
                src={naveenJindalVideo?.src}
                thumbnail={naveenJindalVideo?.thumbnail}
                openVid={() => handleVideoClick(naveenJindalVideo)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Start video grid after half the viewport height */}
      <div className="grid grid-cols-4 gap-y-6">
        {videos?.map((video) => (
          <VideoCard
            key={video.name} // Use a unique identifier for each video
            name={video?.name}
            src={video?.src}
            thumbnail={video?.thumbnail}
            openVid={() => handleVideoClick(video)} // Pass the video data to the click handler
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;
