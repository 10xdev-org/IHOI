import fs from "fs";
import path from "path";

export async function GET(req) {
  const externalPath = path.resolve(process.cwd(), "external_contents");
  const contentFile = path.join(externalPath, "appContent.json");

  try {
    // Check if the external_contents folder exists
    if (!fs.existsSync(externalPath)) {
      console.warn("external_contents folder is missing.");
      return new Response(JSON.stringify({ videos: [] }), { status: 200 });
    }

    // Check if appContent.json exists
    if (!fs.existsSync(contentFile)) {
      console.warn("appContent.json is missing.");
      return new Response(JSON.stringify({ videos: [] }), { status: 200 });
    }

    // Read and parse appContent.json
    const appContent = JSON.parse(fs.readFileSync(contentFile, "utf-8"));

    // Modify the links for thumbnail and src
    const updatedContent = {
      ...appContent,
      videos: appContent.videos.map((video) => ({
        ...video,
        thumbnail: `/external_contents/${video.thumbnail}`,
        src: `/external_contents/${video.src}`,
      })),
    };

    // Return the updated JSON
    return new Response(JSON.stringify(updatedContent), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET", // Allow only GET requests
      },
    });
  } catch (error) {
    console.error("Error processing appContent.json:", error.message);
    // Return default value in case of any error
    return new Response(JSON.stringify({ videos: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET", // Allow only GET requests
      },
    });
  }
}
