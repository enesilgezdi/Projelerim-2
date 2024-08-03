import React from 'react'
import tick from '../assets/todo-app-assets/tick.png'
import notTick from '../assets/todo-app-assets/not_tick.png'
import deleteIcon from '../assets/todo-app-assets/delete.png'


function TodoItem({ text, id, isComplete, deleteTodo, toggle }) {
    return (
        <div className='flex items-center my-2 gap-3' >
            <div onClick={() => { toggle(id) }} className='flex flex-1 items-center cursor-pointer '>
                <img className='w-7' src={isComplete ? tick : notTick} alt="" />
                <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "line-through" : ""}`}>{text}</p>
            </div>


            <img onClick={() => { deleteTodo(id) }} src={deleteIcon} alt="" className='w-3.5' />
        </div>
    )
}

export default TodoItem
