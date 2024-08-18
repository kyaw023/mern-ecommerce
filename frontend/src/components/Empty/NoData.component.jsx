import React from "react";
import Lottie from "lottie-react";

const NoDataComponent = ({ children, data, photo }) => {
  return (
    <div>
      {data?.length === 0 ? (
        <div className=" h-screen flex items-center justify-center">
          <Lottie className=" h-[400px]" animationData={photo} loop={true} />;
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default NoDataComponent;
