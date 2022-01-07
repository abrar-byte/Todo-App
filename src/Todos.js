import { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { MdDelete, MdSaveAlt } from "react-icons/md";

import axios from "axios";

const API_URL = "http://localhost:3004";
function Todo() {
  // ref untuk menandai sesuatu
  const todoinputref = useRef();
  const [todo, gantitodo] = useState([
    { label: "minum kopi", status: "draft" },
  ]);
  const [edit, gantiedit] = useState("");

  const getData = async () => {
    // const response = await axios.get(`${API_URL}/posts`);
    // console.log(response, "response");
    // const data = 'http://localhost:3004/posts'
    axios
      .get(`${API_URL}/posts`)
      .then((r) => gantitodo(r.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);

  const onEnter = function (e) {
    if (e.code === "Enter") {
      const label = e.target.value;
      const newTodo = [...todo];
      newTodo.push({ label, status: "draft" });
      gantitodo(newTodo);
      e.target.value = "";
    }
  };

  // kalau tanpa form onSubmit pake ini
  const onClick = (e) => {
    // isi dari yang ditulis di label
    const label = todoinputref.current.value;
    // cloning data dengan [...todo] dan tipenya harus sama, ... tiga untuk mengambil semua
    const newTodo = [...todo];
    newTodo.push({ label, status: "draft" });
    gantitodo(newTodo);
    // menghapus value yang di penambahannya
    todoinputref.current.value = "";
  };

  const handleSubmit = (e) => {
    // gantitodo(newTodo);
    e.preventDefault();
    const label = e.target.label.value;
    // const newTodo = [...todo];
    // newTodo.push({ label, status: "draft" });
    // gantitodo(newTodo);
    const payload = { label, status: "draft" };
    axios
      .post(`${API_URL}/posts`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        getData();
      });
    e.target.label.value = "";
  };

  const checktodo = (e, i) => {
    const newTodo = [...todo];
    if (e.target.checked) {
      const id = newTodo[i].id;
      const payload = { status: "done" };
      axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
        getData();
      });
    }
  };

  const checkdraft = (e, i) => {
    const newTodo = [...todo];
    if (e.target.checked) {
      // newTodo[i].status = "draft";
      // gantitodo(newTodo);
      // console.log(newTodo[i].status);
      const id = newTodo[i].id;
      const payload = { status: "draft" };
      axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
        getData();
      });
    }
  };

  const handleOnChange = (e, i) => {
    const newTodo = [...todo];
    newTodo[i].label = e.target.value;
    gantiedit(e.target.value);
    const id = newTodo[i].id;
    console.log(id);
    // const payload = { label: e.target.value };

    // axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
    //   getData();
    // });

    // console.log(todo);
    // const { name, value } = e.target;
    // console.log({ ...todo, [name]: value });
    // gantitodo({ ...todo, [name]: value });
  };
  // console.log(edit,"coba");

  const handleEdit = ( x,i) => {
    // const newTodo = [...todo];
    // const id = newTodo[i].id;
    // console.log(id,"2");
    // console.log(x.id, "id");
    if(edit){
    const payload = { label: edit };

    axios.patch(`${API_URL}/posts/${x.id}`, payload).then(() => {
      getData();
    });}
  };

  const onDelete = (e, i) => {
    const newTodo = [...todo];
    const id = newTodo[i].id;
    // const payload ={status : "done"};
    axios.delete(`${API_URL}/posts/${id}`).then(() => {
      getData();
    });
  };

  console.log("render");

  // const [isDrag, setIsDrag] = useState({});

  return (
    <div>
      <h1 className="text-center font-extrabold text-4xl text-teal-500			">
        FAKE TRELLO
      </h1>
      <div className="grid grid-cols-2 gap-10">
        <div
          className="p-10 mx-auto w-full"
          onDrop={(e) => {
            let value = JSON.parse(e.dataTransfer.getData("done"));
            const newTodo = [...todo];
            // newTodo[value.index].status = "draft";
            // gantitodo(newTodo);
            const id = newTodo[value.index].id;
            const payload = { status: "draft" };
            axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
              getData();
            });

            console.log(newTodo[value.index].status, "newTodo[value.index]");
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-xl text-gray-500">Todo</div>
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
                  className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded"
                >
                  <input type="checkbox" onChange={(e) => checktodo(e, i)} />
                  {/* <label htmlFor="">{x.label}</label> */}

                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e, i)}
                    value={x.label}
                    className="w-full "
                  />
                  {/* pake cara ambil map dari item */}
                  <MdSaveAlt onClick={() => handleEdit(x,i)} className="hover:text-red-700" role="button"/>
                  {/* Pake cara object asign */}
                  <MdDelete onClick={(e) => onDelete(e, i)} className="hover:text-red-700" role="button" />
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
                className="w-full outline-0"
                placeholder="Write as You Like 🔪️"
                // onKeyUp={onEnter}
              />
              {/* dengan type submit bisa enter juga */}
              <button type="submit" className="hover:text-red-700" >Save</button>
            </div>
          </form>
        </div>
        <div
          className="p-10 mx-auto w-full"
          onDrop={(e) => {
            let value = JSON.parse(e.dataTransfer.getData("draft"));
            const newTodo = [...todo];
            // newTodo[value.index].status = "done";
            // gantitodo(newTodo);
            const id = newTodo[value.index].id;
            const payload = { status: "done" };
            axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
              getData();
            });
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-xl text-gray-500">Done</div>
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
                  <input type="checkbox" onChange={(e) => checkdraft(e, i)} />
                  {/* <label htmlFor="">{x.label}</label> */}
                  <input
                    type="text"
                    onChange={(e) => handleOnChange(e, i)}
                    value={x.label}
                    className="w-full "
                  />
                 
                  <MdSaveAlt onClick={() => handleEdit(x, i)} className="hover:text-red-700" role="button"/>

                  <MdDelete onClick={(e) => onDelete(e, i)} className="hover:text-red-700" role="button" />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
// pertanyaan, kenapa axios.get nya bisa 2 kali
// kenapa state edit berubah ketika di setState ke State lainnya