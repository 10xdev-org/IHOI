import fs from "fs";
import path from "path";

/**
 * Loads initial content from the appContent.json file.
 * Converts media paths to relative URLs for serving in a web app.
 *
 * @returns {object} The parsed content with updated paths for use in the app.
 */
export default function initialContentLoader() {
  const defaultContent = {
    screensaver: "",
    background: "",
    videos: [],
  };

  try {
    // Path to the external_contents directory
    const baseDir = path.join(process.cwd(), "public", "external_contents");
    const filePath = path.join(baseDir, "appContent.json");

    // Check if appContent.json exists and load its data
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const content = JSON.parse(fileData);

      // Update paths to use relative URLs for media
      const updatedContent = {
        videos: content.videos.map((video) => ({
          ...video,
          thumbnail: `./external_contents/${video.thumbnail}`,
          src: `./external_contents/${video.src}`,
        })),
      };

      return updatedContent;
    } else {
      console.warn("appContent.json not found, using default content.");
      return defaultContent;
    }
  } catch (error) {
    console.error("Error loading external content:", error);
    return defaultContent;
  }
}
