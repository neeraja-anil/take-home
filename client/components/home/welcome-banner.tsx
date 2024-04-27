"use client";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChevronDown, User } from "react-feather";
import { ROUTES, UN_AUTH_PAGES } from "../utils/constants";

function WelcomeBanner() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const onLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("user");
    router.push(UN_AUTH_PAGES.LOGIN);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={onLogout}>Logout</div>,
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {`Welcome , ${userName}`}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Unlock Your Productivity: One Task At A Time!
          </p>
        </div>
        <Dropdown menu={{ items }}>
          <div className="text-white flex space-x-4 mr-6">
            Logout
            <User />
          </div>
        </Dropdown>
      </div>
    </>
  );
}

export default WelcomeBanner;
