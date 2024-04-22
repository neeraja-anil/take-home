import React from "react";

function WelcomeBanner() {
  return (
    <>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome , Neeraja
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Unlock Your Productivity: One Task At A Time!
          </p>
        </div>
      </div>
    </>
  );
}

export default WelcomeBanner;
