"use client";

import { Loader } from "react-feather";

const PageLoader = ({ message }: { message?: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <span className="text-primary flex flex-row justify-center items-center mt-4">
          <Loader className="animate-spin mr-2" />
          <span>{message || "Initiating..."}</span>
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
