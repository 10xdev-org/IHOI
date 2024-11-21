"use client";

import { createContext, useContext, useState } from "react";

const ScreensaverContext = createContext();

export const ScreensaverProvider = ({ children, initialContent }) => {
  const [screensaverDisabled, setScreensaverDisabled] = useState(false);
  const [appContent, setAppContent] = useState(initialContent);

  return (
    <ScreensaverContext.Provider
      value={{ screensaverDisabled, setScreensaverDisabled, appContent }}
    >
      {children}
    </ScreensaverContext.Provider>
  );
};

export const useScreensaverContext = () => useContext(ScreensaverContext);
