import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice";

const Todos = () => {
  const [timer, settimer] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [formattedTime, setFormattedTime] = useState("");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds((prevtotalseconds) => {
          if (prevtotalseconds > 0) {
            console.log(convertSecondsToHoursAndMinutes(prevtotalseconds - 1));
            return prevtotalseconds - 1;
          } else {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    setFormattedTime(convertSecondsToHoursAndMinutes(totalSeconds));
  }, [totalSeconds]);

  const handlechange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    settimer(value);
    timepassed(value);
  };

  const timepassed = (time) => {
    let [hours, minutes, seconds] = time.split(":").map(Number);
    if (seconds == undefined) seconds = 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(totalSeconds);

    setIsActive(true);

    console.log(hours);
    console.log(minutes);
    console.log(seconds);
    console.log(totalSeconds);
  };

  const convertSecondsToHoursAndMinutes = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `
    ${hours.toString().padStart(2, "0")}:
    ${minutes.toString().padStart(2, "0")}:
    ${seconds.toString().padStart(2, "0")}`;
  };

  return (    
    <>
      <div className="max-w-md mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center mt-2 bg-gray-100 p-2 rounded"
          >
            <span>{todo.text}</span>
            <input
              id="timer"
              value={timer}
              step="1"
              onChange={handlechange}
              type="time"
              placeholder="Set Time"
              className="border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 w-13 ml-2"
            />
            <p className="bg-blue-700 rounded-md p-1 text-white">
              {formattedTime}
            </p>
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

