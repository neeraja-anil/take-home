import React from "react";
import Todos from "./todos";

const TodoList = ({
  completedTodos,
  pendingTodos,
}: {
  completedTodos: any;
  pendingTodos: any;
}) => {
  return (
    <div className="w-full flex space-x-24 mt-6">
      <div className="w-full flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Pending Todos</h2>
        <div className=" bg-gray-100 p-4 rounded-md">
          {pendingTodos?.map((todo: any) => (
            <Todos key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Completed Todos</h2>
        <div className=" bg-gray-100 p-4 rounded-md">
          {completedTodos?.map((todo: any) => (
            <Todos key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
