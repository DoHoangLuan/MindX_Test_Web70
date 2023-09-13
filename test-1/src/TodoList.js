import { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoItem = ({ label, done = false, onCheck, id }) => {
    return (
        <div id={id} onClick={() => onCheck(id)} className={`todo-item-container ${done ? "done" : ""}`} >
            {
                done ?
                    <FaRegCheckCircle color="#9a9a9a" className="item-done-button" /> :
                    <FaRegCircle className="item-done-button" color="#9a9a9a" />
            }

            <div className="item-title">{label}</div>
        </div>
    )
}

const TodoList = ({ listTodo = [], onCheck }) => {
    return (
        <div className="todo-list-container">
            {listTodo.map((todo) => {
                return <TodoItem id={todo.id} onCheck={onCheck} done={todo.done} label={todo.label} />
            })}
        </div>
    );
};

export default TodoList;
