import React from "react";
import initialContentLoader from "./utils/initialContentLoader";
import Screensaver from "./components/Screensaver";
import { ScreensaverProvider } from "./ScreensaverContext";
import "./globals.css";

// This layout component runs on the server and can safely access the filesystem
export default async function RootLayout({ children }) {
  const initialContent = initialContentLoader();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
        />
      </head>
      <body>
        <ScreensaverProvider initialContent={initialContent}>
          <Screensaver />
          {React.cloneElement(children)}
        </ScreensaverProvider>
      </body>
    </html>
  );
}
