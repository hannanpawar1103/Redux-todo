import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice";

const Todos = () => {
  const [timer, settimer] = useState();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handlechange = (e) => {
    settimer(e.target.value)
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center mt-2 bg-gray-100 p-2 rounded"
          >
            <span>{todo.text}</span>
            <p>{timer}</p>
            <input

              value={timer}
              onChange={handlechange}
              type="time"
              placeholder="Set Time"
              className="border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 w-13 ml-2"
            />
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
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
