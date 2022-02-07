import { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { MdDelete, MdSaveAlt } from "react-icons/md";

function App() {
  const todoinputref = useRef();
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const label = e.target.label.value;
    const newTodo = [...todo];
    newTodo.push({ label, status: "draft" });
    setTodo(newTodo);

    e.target.label.value = "";
  };

  const checktodo = (e, i) => {
    const newTodo = [...todo];
    if (e.target.checked) {
      newTodo[i].status = "done";
      setTodo(newTodo);
    }
  };

  const checkdraft = (e, i) => {
    const newTodo = [...todo];
    if (e.target.checked) {
      newTodo[i].status = "draft";
      setTodo(newTodo);
    }
  };

  const handleOnChange = (e, i) => {
    const newTodo = [...todo];
    newTodo[i].label = e.target.value;
    setEdit(e.target.value);
    console.log(setEdit);
  };

  const handleEdit = (x, i) => {
    const newTodo = [...todo];

    if (edit) {
    }
  };

  const onDelete = (e, i) => {
    const newTodo = [...todo];
    newTodo.splice(i, 1);
    setTodo(newTodo);
  };

  return (
    <div>
      <h1 className="text-center font-extrabold text-4xl text-blue-400 p-5">
        TODO LIST
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          className="p-10 mx-auto w-full"
          onDrop={(e) => {
            let value = JSON.parse(e.dataTransfer.getData("done"));
            const newTodo = [...todo];
            newTodo[value.index].status = "draft";
            setTodo(newTodo);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-xl text-green-700">Todo</div>
          <form className="space-y-5 m-5 w-full" onSubmit={handleSubmit}>
            {todo.map((x, i) => {
              return x.status === "draft" ? (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData(
                      "draft",
                      JSON.stringify({ ...x, index: i })
                    )
                  }
                  className="flex items-center space-x-3 border border-blue-800 px-4 py-2 rounded"
                >
                  <input
                    className="p-2 focus:outline-none"
                    type="checkbox"
                    onChange={(e) => checktodo(e, i)}
                  />

                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e, i)}
                    value={x.label}
                    className="w-full p-2 focus:outline-none"
                  />

                  {/* Pake cara object asign */}
                  <MdDelete
                    onClick={(e) => onDelete(e, i)}
                    className="hover:text-red-700"
                    role="button"
                  />
                </div>
              ) : null;
            })}
            <div className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded">
              <HiPlus />
              <input
                ref={todoinputref}
                required
                autoComplete="off"
                name="label"
                type="text"
                className="w-full outline-0 p-2 focus:outline-none"
                placeholder="Write as You Like 🔪️"
              />
              <button type="submit" className="hover:text-red-700">
                Save
              </button>
            </div>
          </form>
        </div>
        <div
          className="p-10 mx-auto w-full"
          onDrop={(e) => {
            let value = JSON.parse(e.dataTransfer.getData("draft"));
            const newTodo = [...todo];
            newTodo[value.index].status = "done";
            setTodo(newTodo);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-xl text-green-700">Done</div>
          <div className="space-y-5 m-5 w-full">
            {todo.map((x, i) => {
              return x.status === "done" ? (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData(
                      "done",
                      JSON.stringify({ ...x, index: i })
                    )
                  }
                  className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded"
                >
                  <input
                    className="p-2 focus:outline-none "
                    type="checkbox"
                    onChange={(e) => checkdraft(e, i)}
                  />
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e, i)}
                    value={x.label}
                    className="w-full p-2 focus:outline-none "
                  />

                  <MdDelete
                    onClick={(e) => onDelete(e, i)}
                    className="hover:text-red-700"
                    role="button"
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;