import { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { MdDelete, MdSaveAlt } from "react-icons/md";

import axios from "axios";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const API_URL = "http://localhost:4000";
function Falcon() {
  const todoinputref = useRef();
  const [todo, gantitodo] = useState([]);
  const [edit, gantiedit] = useState("");
  const [groups, gantiGroups] = useState([]);

  const getData = async () => {
    axios
      .get(`${API_URL}/posts`)
      .then((r) => {
        const sorted = r.data.sort((a, b) => a.sort - b.sort)

        gantitodo(sorted)
      })
      .catch((e) => console.log(e));
    axios
      .get(`${API_URL}/groups`)
      .then((r) => {
        const sorted = r.data.sort((a, b) => a.sort - b.sort)
        gantiGroups(sorted)
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);


  const coba = async (ifrom, ito) => {

    const from = groups[ifrom]
    const to = groups[ito]

    if (ifrom < ito) {
      for (let index = 0; index < groups.length; index++) {
        if (groups[index].sort <= to.sort && groups[index].sort > from.sort && index !== ifrom) {
          const payload = { sort: groups[index].sort - 1 };

          await axios.patch(`${API_URL}/groups/${groups[index].id}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("index", index);
        }

      }
    } else {
      for (let index = 0; index < groups.length; index++) {
        if (groups[index].sort >= to.sort && groups[index].sort < from.sort && index !== ifrom) {
          const payload = { sort: groups[index].sort + 1 };

          await axios.patch(`${API_URL}/groups/${groups[index].id}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("index", index);
        }

      }
    }


    axios.patch(`${API_URL}/groups/${from.id}`, { sort: to.sort }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    getData();
  };
  const handleSubmit = (e, gname) => {
    e.preventDefault();
    const label = e.target.label.value;
    const sort = todo.length + 1
    // console.log(sort);
    const payload = { label, group: gname, sort };
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

  const addGroup = (e) => {


    const name = todoinputref.current.value;
    const sort = groups.length + 1
    const payload = { name, sort };
    axios
      .post(`${API_URL}/groups`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        getData();
      });
    todoinputref.current.value = "";
  };
  const handleOnChange = (e, i) => {
    const newTodo = [...todo];
    newTodo[i].label = e.target.value;
    gantiedit(e.target.value);
    const id = newTodo[i].id;
    console.log(id);
  };

  const handleEdit = (x, i) => {
    if (edit) {
      const payload = { label: edit };

      axios.patch(`${API_URL}/posts/${x.id}`, payload).then(() => {
        getData();
      });
    }
  };

  const onDelete = (e, i) => {
    const newTodo = [...todo];
    const id = newTodo[i].id;
    axios.delete(`${API_URL}/posts/${id}`).then(() => {
      getData();
    });
  };

  const onDrop = (e, tujuan) => {
    const dataCard = e.dataTransfer.getData("card")
    const dataGroup = e.dataTransfer.getData("group")
    let card = dataCard ? JSON.parse(dataCard) : null
    let sumber = dataGroup ? JSON.parse(dataGroup) : null
    if (card) {
      console.log('drop card')
      const dest = { group: tujuan.name, time: Date.now() };
      axios.patch(`${API_URL}/posts/${card.id}`, dest).then(() => {
        getData();
      });
    } else {
      console.log('drop group')
      console.log('tujuan', tujuan)
      console.log('sumber', sumber)
      axios.patch(`${API_URL}/groups/${sumber.id}`, {sort: tujuan.sort}).then(() => {
        getData();
      });
      axios.patch(`${API_URL}/groups/${tujuan.id}`, {sort: sumber.sort}).then(() => {
        getData();
      });
    }
  };

  const onDragCard = (e, data) => {
    e.dataTransfer.setData("card", JSON.stringify(data));
  };

  const onDragGroup = (e, data) => {
    e.dataTransfer.setData("group", JSON.stringify(data));
  };




  return (
    <div>
      <h1 className="text-center font-extrabold text-4xl text-teal-500">
        FAKE TRELLO
      </h1>

      <div className="flex flex-row space-x-5">
        {groups?.map((g, index) => (
          <div
            className="p-10 w-full cursor-pointer bg-gray-500"
            style={{ minWidth: "24rem" }}
            draggable
            onDragStart={(e) => onDragGroup(e, g)}
            onDrop={(e) => onDrop(e, g)}
            onDragOver={(e) => e.preventDefault()}
          >
            {g.name}
            {/* {groups.map((v, i) => (
              <button
                onClick={() => coba(index, i)}
                className="rounded-md border bg-yellow-200 px-1"
              >
                {v.sort}
              </button>

            ))} */}
            <div className="text-xl text-gray-500">{g.sort} - {g.name}</div>

            <div className="space-y-5 m-5 w-full">
              {todo
                .map((x, i) => {
                  return x.group === g.name ? (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => onDragCard(e, x, i)}
                      className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded cursor-pointer focus-within:border-red-300 w-full"
                    >
                      <IoMdArrowRoundForward role="button" />
                      <input
                        type="text"
                        onChange={(e) => handleOnChange(e, i)}
                        value={x.label}
                        className="w-full outline-none cursor-pointer"
                        onKeyUp={(e) => {
                          if (e.keyCode === 13) {
                            handleEdit(x);
                          }
                        }}
                      />
                      <MdSaveAlt
                        onClick={() => handleEdit(x, i)}
                        className="hover:text-red-700"
                        role="button"
                      />
                      <MdDelete
                        onClick={(e) => onDelete(e, i)}
                        className="hover:text-red-700"
                        role="button"
                      />
                    </div>
                  ) : null;
                })}
              <form onSubmit={(e) => handleSubmit(e, g.name)}>
                <div className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded cursor-pointer focus-within:border-red-300">
                  <HiPlus />
                  <input
                    required
                    autoComplete="off"
                    name="label"
                    type="text"
                    className="w-full outline-none cursor-pointer"
                    placeholder="Write as You Like 🔪️"
                  />
                  <button type="submit" className="hover:text-red-700">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
        <div className="p-10 mx-auto w-full" style={{ minWidth: "24rem" }}>
          <div className="text-xl text-gray-500"> Add Group</div>

          <div className="space-y-5 m-5 w-full">
            <div className="flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded cursor-pointer focus-within:border-red-300">
              <HiPlus />
              <input
                ref={todoinputref}
                required
                autoComplete="off"
                name="group"
                type="text"
                className="w-full outline-none cursor-pointer"
                placeholder="Write as You Like 🔪️"
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    addGroup(todoinputref.current.value);
                  }
                }}
              />
              <button
                onClick={(e) => addGroup(e, todoinputref.current.value)}
                className="hover:text-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Falcon;
