import api, { headerConfig } from "@/app/utils/axios-config";
import { ROUTES } from "@/components/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Edit, Plus, Save } from "react-feather";
import { toast } from "react-toastify";

const ProjectHeader = ({
  toggleAddTodo,
  projectName,
  setProjectName,
  setIsEditing,
  isEditing,
  onNameUpdate,
}: {
  toggleAddTodo: any;
  projectName: any;
  setProjectName: any;
  setIsEditing: any;
  isEditing: any;
  onNameUpdate: any;
}) => {
  const router = useRouter();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setProjectName(value);
  };
  const handleSave = () => {
    setIsEditing(false);
    onNameUpdate?.();
    // Save the updated project name to the backend or perform any necessary action
  };

  return (
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
  );
};

export default ProjectHeader;
