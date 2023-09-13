import "./App.css";
import TodoList from "./TodoList";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import { useId } from 'react';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
const storedInLocal = (listTodo = []) => {
  window.localStorage.setItem('list-todo', JSON.stringify(listTodo))
}
const getFromLocal = () => {
  const listTodoStringified = window.localStorage.getItem('list-todo')
  const listTodo = listTodoStringified ? JSON.parse(listTodoStringified) : [];
  return Array.isArray(listTodo) ? listTodo : []
}

const Home = () => {
  const [text, setText] = useState("");
  const [checkedFinishedOnly, setCheckedFinishOnly] = useState(false)
  const allListTodo = useRef(getFromLocal())
  const [listTodo, setListTodo] = useState(getFromLocal())

  const handleChangeCheckedFinishedOnly = () => {
    if (!checkedFinishedOnly) {
      const finishedTodo = allListTodo.current.filter(todo => todo.done === false)
      setListTodo([...finishedTodo])
    } else {
      setListTodo([...allListTodo.current])
    }
    setCheckedFinishOnly(!checkedFinishedOnly);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newListTodo = [...listTodo, {
      id: Math.random(new Date().getTime()).toFixed(20),
      done: false,
      label: text
    }]
    setListTodo(newListTodo)
    setText("")
    allListTodo.current = newListTodo
    storedInLocal(newListTodo)
  }
  const onCheckTask = (id) => {
    const indexTodoMatched = listTodo.findIndex(todo => id === todo.id);
    listTodo[indexTodoMatched] = {
      ...listTodo[indexTodoMatched],
      done: !listTodo[indexTodoMatched].done
    }
    allListTodo.current = listTodo
    storedInLocal(listTodo)
    setListTodo([...listTodo])
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div>You have {allListTodo.current.filter(todo => todo.done === false).length} tasks left!</div>
          <div>
            <input type="checkbox"
              onChange={handleChangeCheckedFinishedOnly}
              checked={checkedFinishedOnly}
            />
            <span>Not finished only</span></div>
        </div>
        <TodoList onCheck={onCheckTask} listTodo={listTodo} />
        <Form text={text} setText={setText} onSubmit={onSubmit} />
      </div>
      <Footer />
    </div>
  );
};
