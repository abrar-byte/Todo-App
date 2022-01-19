import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { MdDelete, MdSaveAlt } from "react-icons/md";

import axios from "axios";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const API_URL = "http://localhost:4000";
function Todo() {
  const [todo, setTodo] = useState([{ label: "minum kopi", status: "draft" }]);
  const [edit, setEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState([]);

  const getDataGroups = async () => {
    axios
      .get(`${API_URL}/groups`)
      .then((r) => setGroup(r.data))
      .catch((e) => console.log(e));
  };

  const getDataPosts = async () => {
    axios
      .get(`${API_URL}/posts`)
      .then((r) => setTodo(r.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {

    getDataPosts();
    getDataGroups();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const label = e.target.label.value;

    const payload = { label, group: "draft" };
    axios
      .post(`${API_URL}/posts`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        getDataPosts();
      });
    e.target.label.value = "";
  };

  
  const handleOnChange = (e, i) => {
    const newTodo = [...todo];
    newTodo[i].label = e.target.value;
    setEdit(newTodo[i].label);
    // const id = newTodo[i].id;
   
  };
  // console.log(edit,"coba");

  const handleEdit = (x, i) => {
   
    if (edit) {
      const payload = { label: edit };

      axios.patch(`${API_URL}/posts/${x.id}`, payload).then(() => {
        getDataPosts();
      });
      setEdit("");
    }
  };

  const onDelete = (e, i) => {
    const newTodo = [...todo];
    const id = newTodo[i].id;
    // const payload ={status : "done"};
    axios.delete(`${API_URL}/posts/${id}`).then(() => {
      getDataPosts();
    });
  };

  const onDropTodo = (e) => {
    let value = JSON.parse(e.dataTransfer.getDataPosts("done"));
    const newTodo = [...todo];
    const id = newTodo[value.index].id;
    const payload = { status: "draft", time: Date.now() };

    axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
      getDataPosts();
    });

    console.log(newTodo[value.index].status, "newTodo[value.index]");
  };

  const onDragTodo = (e, x, i) => {
    e.dataTransfer.setData("draft", JSON.stringify({ ...x, index: i }));
  };

  const onDropDone = (e) => {
    let value = JSON.parse(e.dataTransfer.getDataPosts("draft"));
    const newTodo = [...todo];
    const id = newTodo[value.index].id;
    const payload = { status: "done", time: Date.now() };
    axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
      getDataPosts();
    });
  };

  const onDragDone = (e, x, i) => {
    e.dataTransfer.setData("done", JSON.stringify({ ...x, index: i }));
  };

  const handleMove = (e, i) => {
    const newTodo = [...todo];
    const id = newTodo[i].id;
    const payload = { group: e.target.innerText, time: Date.now() };
    console.log(id, "idMove");
    console.log(payload, "payload");

    axios.patch(`${API_URL}/posts/${id}`, payload).then(() => {
      getDataPosts();
    });
  };
  const handleGroupMoving = async (e, position) => {
    setLoading(true)

    const payload = { group: e.target.innerText, time: Date.now() };
    await todo.map(
      async (v) =>
      await v.group === position &&
        (await axios.patch(`${API_URL}/posts/${v.id}`, payload))
    );
    await getDataPosts();
    setLoading(false)


  };  

  

  return (
    <>
   {loading? <div className="text-2xl ">LOADING</div> :  <div>
      <h1 className="text-center font-extrabold text-4xl text-teal-500			">
        FAKE TRELLO
      </h1>
      <div className="flex">
        {group.map((item1, i1) => (
          <div
            className="p-10 mx-auto w-full"
            onDrop={(e) => onDropTodo(e)}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-xl text-gray-500">{item1.name}</div>
            {group.map((itemx, ix) => (
              <button onClick={(e)=> handleGroupMoving(e, item1.name)} className="mx-3">
                {itemx.name}
              </button>
            ))}
            <form className="space-y-5 m-5 w-full" onSubmit={handleSubmit}>
              {todo
                .sort((a, b) =>
                  a.time > b.time ? 1 : b.time > a.time ? -1 : 0
                )
                .map((item2, i2) => {
                  return item2.group === item1.name ? (
                    <div
                      key={i2}
                      draggable
                      onDragStart={(e) => onDragTodo(e, item2, i2)}
                      className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded"
                    >
                   
                      {group.map((item3, i3) => (
                        <button onClick={(e) => handleMove(e, i2)}>
                          {item3.name}
                        </button>
                      ))}                    
                      <input
                        type="text"
                        onChange={(e) => handleOnChange(e, i2)}
                        value={item2.label}
                        className="w-full "
                      />
                      <MdSaveAlt
                        onClick={() => handleEdit(item2, i2)}
                        className="hover:text-red-700"
                        role="button"
                      />
                      <MdDelete
                        onClick={(e) => onDelete(e, i2)}
                        className="hover:text-red-700"
                        role="button"
                      />
                    </div>
                  ) : null;
                })}

              <div className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded">
                <HiPlus />
                <input
                  required
                  autoComplete="off"
                  name="label"
                  type="text"
                  className="w-full outline-0"
                  placeholder="Write as You Like 🔪️"
                />
                <button type="submit" className="hover:text-red-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>}
    </>
  );
}

export default Todo;
