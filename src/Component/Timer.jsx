import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice";

const Timer = () => {
  const [timer, settimer] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [formattedTime, setFormattedTime] = useState("");
  const [remainingtime, setremainingtime] = useState(false)
  
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds((prevtotalseconds) => {
          if (prevtotalseconds > 0) {
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
    setremainingtime(true)
  };

  const timepassed = (time) => {
    let [hours, minutes, seconds] = time.split(":").map(Number);
    if (seconds == undefined) seconds = 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(totalSeconds);

    setIsActive(true);


  };

  const convertSecondsToHoursAndMinutes = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return function(){
        if (hours == 0 && minutes == 0 && seconds == 0) {
            if(remainingtime){
                alert("Time's up");
            }
        }else{
            return `
            ${hours.toString().padStart(2, "0")}:
            ${minutes.toString().padStart(2, "0")}:
            ${seconds.toString().padStart(2, "0")}`;
        }
    }


    // return function () {
    //   if (hours == 0 && minutes == 0 && seconds == 0) {
    //     return todos.map((todo) => {
    //       dispatch(removeTodo(todo.id));
    //     });
    //   } else {
    //     return `
    // ${hours.toString().padStart(2, "0")}:
    // ${minutes.toString().padStart(2, "0")}:
    // ${seconds.toString().padStart(2, "0")}`;
    //   }
    // };
  };

  return (
    <div className="flex m-0 p-0">
      <input
        id="timer"
        value={timer}
        step="1"
        onChange={handlechange}
        type="time"
        placeholder="Set Time"
        className="border border-black/10 rounded-lg px-3 bg-zinc-600 outline-none duration-150 py-1.5 w-13 ml-2 mr-2"
      />
      <p className="bg-blue-700 rounded-md p-1 text-black">{formattedTime}</p>
    </div>
  );
};

export default Timer;
