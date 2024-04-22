"use-client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Eye, List, Plus, User } from "react-feather";
import { ROUTES } from "./utils/constants";

const SideBar = ({ toggleProjectForm }: any) => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path === ROUTES.HOME) {
      setMenuItemSelected("home");
    } else if (path === ROUTES.PROFILE) {
      setMenuItemSelected("profile");
    }
  }, [path]);

  const [menuItemSelected, setMenuItemSelected] = useState<string>();

  const menuItems = [
    {
      name: "home",
      icon: <List size={18} />,
      label: "My Projects",
      className: "bg-yellow-500 bg-opacity-75 text-white",
    },
    {
      name: "profile",
      icon: <User size={18} />,
      label: "Profile",
      className: "bg-yellow-500 bg-opacity-75 text-white",
    },
  ];

  const onMenuItemClick = (menu: string) => {
    if (menu === "home") {
      router.push(ROUTES.HOME);
    } else if (menu === "profile") {
      router.push(ROUTES.PROFILE);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col ">
      {/* <Link href={`/take-home/create`}> */}
      <div
        className={`bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4 flex items-center cursor-pointer`}
        onClick={toggleProjectForm}
      >
        <h2 className="text-white text-bold">Add New Project</h2>
        <Plus className="text-white ml-2" />
      </div>
      {/* </Link> */}

      <span className=" w-full p-2 mt-4"></span>

      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`flex justify-start items-center p-3 mb-2 w-full rounded hover:bg-yellow-500  hover:text-white hover:bg-opacity-75 ${
            menuItemSelected === item.name ? item.className : "text-yellow-700"
          }`}
          onClick={() => onMenuItemClick(item.name)}
        >
          {item.icon}
          <p className="pl-3 text-sm font-bold">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
