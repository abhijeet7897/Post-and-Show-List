import "./styles.css";
import React from "react";

async function postData(data) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  const result = await response.json();
  return result;
}

export default function App() {
  const [state, setState] = React.useState({ title: "", body: "", userId: "" });
  const [posts, setPosts] = React.useState([]);
  const [orderType, setOrderType] = React.useState(false);
  const handleSubmit = async () => {
    const result = await postData(state);
    setPosts(posts.concat(result));
  };

  const handleChange = (value, property) => {
    setState({ ...state, [property]: value });
  };

  const changeOrder = () => {
    setOrderType(!orderType);
    setPosts(
      posts.sort((a, b) =>
        orderType ? a.userId - b.userId : b.userId - a.userId
      )
    );
  };
  return (
    <div className="App">
      <fieldset className="formInput">
        <label>
          User:{" "}
          <input
            value={state.userId}
            onChange={(e) => handleChange(e.target.value, "userId")}
          />
        </label>
        <br />
        <label>
          Title :{" "}
          <input
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
          />
        </label>
        <br />
        <label>
          Body:{" "}
          <input
            value={state.body}
            onChange={(e) => handleChange(e.target.value, "body")}
          />
        </label>

        <br />
        <button onClick={handleSubmit}>Submit</button>
      </fieldset>
      <div className="row">
        <div className="column">
          <b>S.No</b>
        </div>
        <div className="column" onClick={changeOrder}>
          <b>User Id</b>
        </div>
        <div className="column">
          <b>Title </b>
        </div>
        <div className="column">
          <b>Body</b>
        </div>
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => (
            <>
              <div className="column">{index + 1}</div>
              <div className="column">{post.userId}</div>
              <div className="column">{post.title}</div>
              <div className="column">{post.body}</div>
            </>
          ))}
      </div>
    </div>
  );
}
