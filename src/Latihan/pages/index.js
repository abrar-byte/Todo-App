import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Linked from "../Router/Linked";

const Home = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `document title ${count}`;
    return () => {
      document.title = "React App";
    };
  }, [count]);
  const history = useHistory();

  return (
    <div>
      <div>
        <Linked />
      </div>
      <h1>

        Home
      </h1>
      <button onClick={() => history.push("/about")}>pindah</button>
      <p>
        You Clicked <strong>{count}</strong>
      </p>
      <button onClick={() => setCount((p) => p + 1)}> Click for plus</button>
      <button onClick={() => setCount(count - 1)}> Click for min</button>
    </div>
  );
};
export default Home;
