import api, { headerConfig } from "@/app/utils/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import React, { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import AddTodo from "../add-todo-form";
import {
  handleDeleteTodo,
  handleUpdateTodo,
} from "@/helperFunctionsForAPI/project";

const Todos = ({ todo }: { todo: any }) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<boolean>(todo?.status === "COMPLETED");
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const mutation = useMutation({
    mutationFn: () => handleUpdateTodoStatus({ status: status, id: todo?.id }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if ({ data }) {
        toast.success("Status updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
      console.log(error.error);
    },
  });

  const todoUpdateMutation = useMutation({
    mutationFn: (formData) => handleUpdateTodo(formData, todo?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if ({ data }) {
        toast.success("Todo updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
      console.log(error.error);
    },
  });

  const todoDeleteMutation = useMutation({
    mutationFn: () => handleDeleteTodo(todo.id),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if ({ data }) {
        toast.success("Todo deleted ");
      }
    },
    onError: (error: any) => {
      toast.error(error.error);
    },
  });

  const handleUpdateTodoStatus = async ({
    id,
    status,
  }: {
    id: any;
    status: any;
  }) => {
    try {
      const todoStatus = status ? "COMPLETED" : "PENDING";
      const response = await api.put(
        `/todos/${id}`,
        { status: todoStatus },
        headerConfig
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const toggleTodoCompletion = (e: any) => {
    setStatus(e.target.checked);
    mutation.mutate();
  };

  const toggleEditTodo = () => {
    toggleAddTodo();
  };

  const handleEditTodo = (formData: any) => {
    todoUpdateMutation.mutate(formData);
    setShowAddTodo(false);
  };

  const toggleDeleteTodo = async () => {
    todoDeleteMutation.mutate();
  };

  return (
    <>
      <div className="w-full">
        <li
          key={todo.id}
          className="w-full border-b border-gray-200 rounded-lg dark:border-gray-600 p-4 flex items-center justify-between"
        >
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => toggleTodoCompletion(e)}
                className="w-4 h-4 appearance-none rounded-full text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label className="ml-3 text-md font-medium text-gray-900 dark:text-gray-800">
                {todo?.name}
              </label>
            </div>
            <span className="text-sm text-gray-500 ml-7">
              {todo?.description}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Edit
                size={18}
                className="cursor-pointer text-gray-500 hover:text-gray-600"
                onClick={toggleEditTodo}
              />
              <Trash2
                size={18}
                className="cursor-pointer text-red-500 hover:text-gray-600"
                onClick={toggleDeleteTodo}
              />
            </div>
          </div>
        </li>
      </div>

      <Modal
        title="Add Todo"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
      >
        <AddTodo
          toggleTodoForm={toggleAddTodo}
          todoId={todo?.id}
          todoName={todo?.name}
          todoDescription={todo?.description}
          onSubmit={handleEditTodo}
        />
      </Modal>
    </>
  );
};

export default Todos;
