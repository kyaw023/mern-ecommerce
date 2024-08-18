import React from "react";
import "ldrs/waveform";

// Default values shown

const LoadingComponent = ({ children, isLoading }) => {
  const isDarkMode = document.documentElement.classList.contains("dark");
  return (
    <div>
      {isLoading ? (
        <div className=" flex items-center justify-center h-screen text-light-text dark:text-dark-text">
          <l-waveform
            size="35"
            stroke="3.5"
            speed="1"
            color={isDarkMode ? "white" : "black"}
          ></l-waveform>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingComponent;
