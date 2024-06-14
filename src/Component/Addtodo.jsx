import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Features/Todo/TodoSlice';

const Addtodo = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const add = (e) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput('');
        }
    };

    return (
        <form onSubmit={add} className="flex justify-center mt-10">
            <div>
            <input
                type="text"
                placeholder="Write Todo..."
                className="border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 w-96 "
                value={input}
                onChange={(e) => setInput(e.target.value)}
            /> <br />
            </div>
            <button type="submit" className="rounded-r-lg px-3 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
};

export default Addtodo;
