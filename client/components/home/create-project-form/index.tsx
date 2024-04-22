import api, { headerConfig } from "@/app/utils/axios-config";
import { ROUTES } from "@/components/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProjectForm = ({ toggleProjectForm }: { toggleProjectForm: any }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({ name: "" });

  const handleCreateProject = async () => {
    const userString: string | null = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    try {
      const response = await api.post(
        "/projects/create",
        { ...formData, userId: user.id },
        headerConfig
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const mutation = useMutation({
    mutationFn: handleCreateProject,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["create"] });
      if ({ data }) {
        router.push(ROUTES.PROJECT.replace("[project]", data.project_id));
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
      console.log(error.error);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFinish = (e: any) => {
    e.preventDefault();
    mutation.mutate(formData);
    router.push(ROUTES.PROJECT.replace("[project]", formData.name));
    toggleProjectForm();
  };
  return (
    <div className="mt-6">
      <form id="todoForm" onSubmit={onFinish}>
        <div className="mb-4 flex items-center justify-between">
          <label className=" font-bold mb-1">Project Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Enter project name"
            required
            onChange={handleChange}
            value={formData?.name || ""}
            className="w-[70%] px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-50 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-yellow-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
