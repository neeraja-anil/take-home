import api, { headerConfig } from "@/app/utils/axios-config";
import { ROUTES } from "@/components/utils/constants";
import { handleDownload } from "@/helperFunctionsForAPI/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Download, Edit, Plus, Save } from "react-feather";
import { toast } from "react-toastify";

const ProjectHeader = ({
  toggleAddTodo,
  projectName,
  setProjectName,
  setIsEditing,
  isEditing,
  onNameUpdate,
  completedTodos,
  pendingTodos,
}: {
  toggleAddTodo: any;
  projectName: any;
  setProjectName: any;
  setIsEditing: any;
  isEditing: any;
  onNameUpdate: any;
  completedTodos: any;
  pendingTodos: any;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const totalTodos = completedTodos?.length + pendingTodos?.length;

  const handleChange = (e: any) => {
    const { value } = e.target;
    setProjectName(value);
  };
  const handleSave = () => {
    setIsEditing(false);
    onNameUpdate?.();
  };

  const downloadProjectMutation = useMutation({
    mutationFn: (data) => handleDownload(data),
    onSuccess: () => {
      toast.success("Project summery downloaded");
    },
    onError: (error: any) => {
      toast.error(error.error);
    },
  });

  const onDownload = async () => {
    const data: any = {
      title: projectName,
      completedTodos,
      totalTodos,
      pendingTodos,
    };
    downloadProjectMutation.mutate(data);
  };

  return (
    <div className="mt-6 flex justify-between">
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item
            onClick={() => router.push(ROUTES.HOME)}
            className="cursor-pointer"
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Project</Breadcrumb.Item>
        </Breadcrumb>

        <div className="mt-6 flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={projectName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          ) : (
            <h1 className="text-3xl font-bold">{projectName}</h1>
          )}
          {!isEditing ? (
            <Edit
              size={18}
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <Save size={18} className="cursor-pointer" onClick={handleSave} />
          )}
        </div>

        <button
          className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800"
          onClick={toggleAddTodo}
        >
          Add Todo
          <Plus size={18} />
        </button>
      </div>
      <div>
        <button
          className={`bg-gray-100  border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white rounded-lg p-3 flex items-center cursor-pointer`}
          onClick={() => onDownload()}
        >
          <h2 className=" text-sm">Download Summary</h2>
          <Download className=" ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;
