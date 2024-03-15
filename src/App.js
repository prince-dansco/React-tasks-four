import React, { useEffect, useRef, useState } from "react";

function App() {
  const myRef = useRef();

  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const savedTodo = localStorage.getItem("todo");
    if (savedTodo) {
      setTodo(JSON.parse(savedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask !== "") {
      if (editItem !== null) {
        const editeTodo = [...todo];
        editeTodo[editItem] = newTask;
        setTodo(editeTodo);
        setEditItem(null);
      } else {
        setTodo([...todo, newTask]);
      }

      setNewTask("");
      myFunction();
    }
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (index) => {
    setTodo(todo.filter((todoItem, i) => i !== index));
  };
  function myFunction() {
    myRef.current.value = "";
    myRef.current.focus();
  }
  const handleEdit = (index) => {
    setNewTask(todo[index]);
    setEditItem(index);
    myRef.current.focus();
  };

  return (
    <div className="App">
      <h1>my todo list</h1>
      <p><i>lord dansco</i></p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="add task"
            ref={myRef}
            autoFocus
            onChange={handleChange}
            value={newTask}
          />
          <button className="btn">
            {editItem !== null ? "update" : "AddTask"}
          </button>
        </form>
        <div className="">
          {todo.map((todoItem, index) => (
            <div className="todoItem" key={index}>
              <p>{todoItem}</p>
              <div className="flex">
                <button className="delete" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                <button className="edit" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
