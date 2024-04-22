import api, { headerConfig } from "@/app/utils/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({
  toggleTodoForm,
  projectId,
  todoId,
  todoName,
  todoDescription,
  onSubmit,
}: {
  toggleTodoForm: any;
  projectId?: any;
  todoId?: any;
  todoName?: any;
  todoDescription?: any;
  onSubmit?: any;
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({ name: "", description: "" });

  useEffect(() => {
    if (todoId) {
      setFormData({ name: todoName, description: todoDescription });
    }
  }, [todoName, todoDescription]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    toggleTodoForm();
    onSubmit?.(formData);
  };

  return (
    <div>
      <form action="" onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Todo Name"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={formData?.name || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Todo Description"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData?.description || ""}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-50 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-yellow-700"
            >
              {todoId ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
