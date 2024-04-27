import { Image, Modal } from "antd";
import React, { useState } from "react";
import { Plus, Trash2 } from "react-feather";
import AddTodo from "../add-todo-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleAddTodo,
  handleDeleteProject,
} from "@/helperFunctionsForAPI/project";
import { toast } from "react-toastify";

export default function ProjectCard({ project, onCardClick }: any) {
  const queryClient = useQueryClient();

  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const todoMutation = useMutation({
    mutationFn: (formData) => handleAddTodo(formData, project?.id),
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

  const deleteProjectMutation = useMutation({
    mutationFn: () => handleDeleteProject(project.id),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if ({ data }) {
        toast.success("Project deleted ");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
    },
  });

  const onClick = () => {
    onCardClick?.(project.id);
  };

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const onAddTodo = (formData: any) => {
    todoMutation.mutate(formData);
    setShowAddTodo(false);
  };

  const onDeleteProject = () => {
    deleteProjectMutation.mutate();
  };

  return (
    <div
      className="shadow-lg rounded-lg p-4 cursor-pointer transition-all ease-in-out hover:scale-[1.03] overflow-y-auto"
      style={{ height: "270px", width: "250px" }}
    >
      <div className="flex justify-between items-center">
        <div className="rounded-tl-lg rounded-tr-lg w-full bg-light hover:bg-primary-alt cursor-pointer">
          <div
            className="flex flex-col w-full p-4 justify-between text-gray-700 hover:text-gray-800"
            onClick={onClick}
          >
            <span className="text-lg font-semibold text-primary">
              {project?.name}
            </span>
            <span className="text-[11px]">{project?.description}</span>
          </div>
        </div>
        <Trash2
          className="text-red-400 hover:text-red-500"
          size={18}
          onClick={onDeleteProject}
          data-testid="delete-project"
        />
      </div>

      <div className="bg-gradient-to-bl from-primary to-secondary mb-2 rounded-bl-lg rounded-br-lg p-1 pl-4 pr-2 text-light scroll-">
        <div className="flex flex-col justify-between">
          {!project?.todos.length ? (
            <div className="flex flex-col justify-center items-center">
              <button
                className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800"
                onClick={toggleAddTodo}
              >
                Add Todo
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <>
              <span>{"Todo's"}</span>
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {project?.todos?.slice(0, 2).map((item: any) => (
                  <li
                    key={item.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        type="checkbox"
                        disabled
                        className="w-4 h-4 appearance-none rounded-full text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {item?.name}
                      </label>
                    </div>
                  </li>
                ))}
                {/* Show count if todos length is greater than 2 */}
                {project?.todos?.length > 2 && (
                  <li
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                    onClick={onClick}
                  >
                    <div className="flex items-center ps-3">
                      <span className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        + {project.todos.length - 2} more
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Add Todo"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
      >
        <AddTodo
          toggleTodoForm={toggleAddTodo}
          projectId={project?.id}
          onSubmit={onAddTodo}
        />
      </Modal>
    </div>
  );
}
