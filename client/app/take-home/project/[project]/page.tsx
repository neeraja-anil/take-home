"use client";
import api, { headerConfig } from "@/app/utils/axios-config";
import AddTodo from "@/components/home/add-todo-form";
import ProjectHeader from "@/components/home/project-details-header";
import TodoList from "@/components/home/todo-list";
import { ROUTES } from "@/components/utils/constants";
import {
  findProject,
  handleAddTodo,
  handleUpdateProject,
} from "@/helperFunctionsForAPI/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Edit, Plus, Save } from "react-feather";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [project, setProject] = useState<any>({});
  const [projectName, setProjectName] = useState<string>("Project Name");
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: () =>
      handleUpdateProject({ id: params?.project, projectName: projectName }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["update"] });
      if ({ data }) {
        toast.success("Project created successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
      console.log(error.error);
    },
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["project"],
    queryFn: () => findProject(params?.project),
  });

  useEffect(() => {
    setProject(data);
    setProjectName(data?.name);
  }, [data]);

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const onNameUpdate = () => {
    mutation.mutate();
    setIsEditing(false);
  };

  const todoMutation = useMutation({
    mutationFn: (formData) => handleAddTodo(formData, project?.project_id),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if ({ data }) {
        toast.success("Todo added successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
      console.log(error.error);
    },
  });

  const onAddTodo = (formData: any) => {
    todoMutation.mutate(formData);
    setShowAddTodo(false);
  };

  return (
    <div>
      <ProjectHeader
        toggleAddTodo={toggleAddTodo}
        onNameUpdate={onNameUpdate}
        setProjectName={setProjectName}
        projectName={projectName}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />

      {/* todo list */}
      <TodoList project={project} />
      <Modal
        title="Add Todo"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
      >
        <AddTodo
          toggleTodoForm={toggleAddTodo}
          projectId={project?.project_id}
          onSubmit={onAddTodo}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetails;
