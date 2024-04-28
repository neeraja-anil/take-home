"use client";

import api, { headerConfig } from "@/app/utils/axios-config";
import Empty from "@/components/empty";
import ProjectList from "@/components/home/project-card";
import WelcomeBanner from "@/components/home/welcome-banner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userString: string | null = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
  }, []);

  const getProjects = async () => {
    try {
      if (!user) return;
      const response = await api.get(`/projects/list/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: !!user,
  });

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="flex flex-col">
      <WelcomeBanner />
      <div className="flex justify-between mt-6">
        {list?.length === 0 ? (
          <Empty title="No Projects Found" />
        ) : isPending ? (
          <div> Projects Loading...</div>
        ) : (
          <ProjectList list={list} />
        )}
      </div>
    </div>
  );
}
