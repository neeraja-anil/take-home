"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES, UN_AUTH_PAGES } from "../components/utils/constants";
import PageLoader from "@/components/page-loader";

const LandingScreen = () => {
  const Router = useRouter();

  const userString: string | null = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (user?.token) {
      navigateToHomeScreen();
    } else {
      navigateToLoginScreen();
    }
  }, [user]);

  const navigateToHomeScreen = () => {
    const path = ROUTES.HOME;
    Router.replace(path);
  };

  const navigateToLoginScreen = () => Router.replace(UN_AUTH_PAGES.LOGIN);

  return <PageLoader />;
};

const provider = () => {
  return <LandingScreen />;
};

export default provider;
