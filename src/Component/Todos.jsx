import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice";
import Timer from "./Timer";

const Todos = () => {

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();


  return (    
    <>
      <div className="max-w-md mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center mt-2 bg-zinc-700 p-2 rounded-xl"
          >
            <span>{todo.text}</span>
            <Timer/>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="rounded-r-lg px-3 py-1 bg-red-600 text-white shrink-0"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;

