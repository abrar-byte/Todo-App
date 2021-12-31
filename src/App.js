import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const { register, handleSubmit, reset } = useForm();
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  // const clr = editTodo && 'focus:ring-2 focus:ring-blue-600'   
  

  const updateTodo = (todo, id) => {
    const newTodo = todos.map((tod) => (tod.id === id ? todo : tod));
    newTodo.id = id;
    setTodos(newTodo);
    setEditTodo("");
  };

  const onSubmit = (values) => {
    if (!editTodo) {
      const dataBaru = JSON.parse(JSON.stringify(todos));
      const obj = values;
      obj.id = uuidv4();
      dataBaru.push(obj);
      setTodos(dataBaru);
      console.log(dataBaru);
      reset();
    } else {
      updateTodo(values, editTodo.id);
      reset()
    }
  };

  const move = (values, i, x) => {
    if(x === 4 - 0){
    const dataBaru = JSON.parse(JSON.stringify(done));
    dataBaru.push(values);
    setDone(dataBaru);
    todos.splice(i, 1);}else{  const dataBaru = JSON.parse(JSON.stringify(todos));
      dataBaru.push(values);
      setTodos(dataBaru);
      done.splice(i, 1);

    }
  };
  const deleteInput = async (i,x) => {
    if(x === "as simple as that"){
    const data = JSON.parse(JSON.stringify(todos));
    await data.splice(i, 1);
    setTodos(data);
    } else {
      const data = JSON.parse(JSON.stringify(done));
      data.splice(i, 1);
      setDone(data);
    }
  };
 
  
  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
    alert("Edit di input yang tersedia 🔪️ ");
   

  };
  

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-screen">
    <div className="container mx-auto px-6 h-96 max-w-4xl bg-red-300	 overflow-y-auto">
      <h1 className=" font-extrabold text-4xl uppercase text-center mb-5 text-zinc-900 ">
        TODO LIST
      </h1>
      <div className="grid grid-cols-2 ">
        <div className=" text-center font-bold  ">
          <h2 className="uppercase mb-5">Todo List</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold uppercase  mb-7">
              Tambah{" "}
            </label>
            <br />
            <input
              autoFocus
              required
              type="text"
              placeholder="write as you like
              ! 😉️"
              {...register("title")}
              // className={`${clr} border border-black box-border  rounded  mb-5 mr-2 px-1`}
              className="border border-black box-border  rounded  mb-5 mr-2 px-1" 
            />
            <button
              type="submit"
              className="w-auto px-5 rounded-lg bg-green-500 "
            >
              Submit
            </button>
          </form>

          {todos.map((item, i) => {
            console.log(item, "mapping");
            return (
              <div
                key={i}
                className="flex border border-black box-border mb-5 mx-2"
              >
                <h1 className="flex-grow">{item.title}</h1>
                <button
                  onClick={() => move(item, i,4-0)}
                  className=" rounded-md bg-green-500 mr-2 text-xs px-1"
                >
                  ✔️
                </button>

                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-md bg-yellow-200	 mr-2 text-xs px-1"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteInput(i,"as simple as that")}
                  className="rounded-md bg-gray-500	  text-xs px-1 "
                >
                  ❌️
                </button>
              </div>
            );
          })}
        </div>
        <div className="text-center font-bold  ">
          <h2 className="uppercase mb-5">Done</h2>

          {done.map((item, i) => (
            <div
              key={i}
              className="flex border border-black box-border mx-2 mb-5"
            >
              <h1 className="flex-grow">{item.title}</h1>
              <button
                onClick={() => move(item, i, 5-0)}
                className="rounded-md bg-green-500 mr-2 text-xs px-1"
              >
                ⬅️
              </button>
              <button
                onClick={() => deleteInput(i,"halo ges david di sini")}
                className="rounded-md bg-gray-500	  text-xs px-1"
              >
                {" "}
                ❌️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
