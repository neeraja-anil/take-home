"use client";
import ProjectForm from "@/components/home/create-project-form";
import SideBar from "@/components/sider-menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Modal } from "antd";
import { useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const [showModal, setShowModal] = useState(false);

  const toggleProjectForm = () => {
    setShowModal(!showModal);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <div
          className={`hidden lg:block xl:block flex-initial transition-all duration-100 ease-out mr-4`}
        >
          <div className="sticky top-0 mt-6 h-[calc(100vh-200px)] p-4">
            <SideBar toggleProjectForm={toggleProjectForm} />
          </div>
        </div>
        <div className="flex-1 h-[calc(100vh-90px)] overflow-y-scroll w-[80%] mt-6 p-4">
          {children}
        </div>
        <Modal open={showModal} onCancel={toggleProjectForm} footer={null}>
          <ProjectForm toggleProjectForm={toggleProjectForm} />
        </Modal>
      </div>
    </QueryClientProvider>
  );
}
