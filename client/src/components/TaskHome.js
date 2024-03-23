import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const TaskHome = () => {
  const navigate = useNavigate();

  // Hook useState
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [showList, setShowList] = useState(true);
  // eslint-disable-next-line
  const [editMessage, setEditMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  // eslint-disable-next-line
  const [deleteMessageSuccess, setDeleteMessageSuccess] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [items, setItems] = useState([
    {
      id: "001",
      name: "Task 1",
      description: "default description",
      status: false,
    },
  ]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? setUsername(user) : "";
      // : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  // Input fields
  // Title
  const handleInput = (e) => {
    setInputTitle(e.target.value);
  };
  // Description
  const handleInputDescription = (e) => {
    setInputDescription(e.target.value);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    setShowList(true);
    setShowNew(true);
    e.preventDefault();
    if (!inputTitle || !inputDescription) {
      alert("Please fill out all fields");
      showList(false);
    } else if (inputTitle && !toggleSubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return {
              ...element,
              title: inputTitle,
              description: inputDescription,
            };
          }
          return element;
        })
      );
      setInputTitle("");
      setInputDescription("");
      setToggleSubmit(true);
      setShowForm(false);
      setShowDelete(true);
    } else {
      const allInputTitle = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        description: inputDescription,
      };
      setItems([...items, allInputTitle]);
      setInputTitle("");
      setInputDescription("");
      setShowForm(false);
    }
  };

  // Delete Form
  const handleDelete = async (index) => {
    console.log(index);
    const updateItems = items.filter((element) => {
      return index.id !== element.id;
    });
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
      setItems(updateItems);
    }, 2000);
    setDeleteMessageSuccess(false);
  };

  // Edit Form
  const handleEdit = (id) => {
    setShowList(false);
    setShowDelete(false);
    setShowNew(false);
    setShowForm(true);
    setToggleSubmit(false);
    let newEditItem = items.find((element) => element.id === id);
    setInputTitle(newEditItem.name);
    setInputDescription(newEditItem.description);
    setShowDelete(true);
    setIsEditItem(id);
    console.log(newEditItem);
  };

  // Add New Task
  const handleAdd = () => {
    setShowForm(true);
    setShowList(true);
    setShowNew(false);
  };

  return (
    <>
      <h1 className="text-center">Task Manager App</h1>
      <h2>Welcome, {username}</h2>
      <button className="btn btn-primary" onClick={logout}>
        LOGOUT
      </button>

      {showNew ? (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add New Task
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {showForm ? (
        <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="text-center">
              <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
            </div>
            <form className="col-12 p-2" onSubmit={handleSubmit}>
              <label htmlFor="title" className="my-2">
                Enter title:
              </label>
              <input
                type="text"
                name="title"
                placeholder="title"
                className="w-100 my-1 p-2"
                onChange={handleInput}
                value={inputTitle}
              />
              <label htmlFor="description" className="my-2">
                Enter description:
              </label>
              <input
                type="text"
                name="description"
                placeholder="description"
                className="w-100 my-1 p-2"
                onChange={handleInputDescription}
                value={inputDescription}
              />
              <div className="text-center">
                {toggleSubmit ? (
                  <button className="btn btn-primary">Add</button>
                ) : (
                  <button className="btn btn-primary">Update</button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {showList ? (
        <div className="container py-2">
          {deleteMessage ? (
            <p className="text-center text-danger">
              Task deleted successfully!
            </p>
          ) : (
            ""
          )}
          {items.map((element, index) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded p-2"
                key={element.id}
              >
                <div className="col-12 d-flex justify-content-betweeen align-items-center">
                  <div>
                    <h4>{element.name}</h4>
                    <p>{element.description}</p>
                  </div>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEdit(element.id)}
                  >
                    Edit
                  </button>
                  {showDelete ? (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(element)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TaskHome;
