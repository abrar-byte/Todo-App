import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, seteditTodo] = useState(null);
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const updateTodo = (title, id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id } : todo
    );
    setTodos(newTodo);
    seteditTodo(null);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input }]);
      setInput("");
      console.log(todos);
    } else {
      updateTodo(input, editTodo.id);
      
    }
  };

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    console.log(findTodo);
    seteditTodo(findTodo);
    setInput(findTodo.title)
  };

  console.log("render");
  return (
    <div>
      <h1>Todo-List</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={input}
          required
          onChange={onInputChange}
          className="border border-black"
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <h2>Todo-List </h2>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => e.preventDefault()}
            />
            <div>
              <button className="text-red-500 mr-5">
                <i>add</i>
              </button>
              <button
                className="text-green-500 mr-5"
                onClick={() => handleEdit(todo)}
              >
                <i>edit</i>
              </button>
              <button
                className="text-yellow-500"
                onClick={() => handleDelete(todo)}
              >
                <i>delete</i>
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
