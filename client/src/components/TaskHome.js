import React from "react";
import { useState } from "react";

const TaskHome = () => {
  // usestate to handle the data state on Task Manager App
  const [showForm, setShowForm] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [showList, setShowList] = useState(true);
  const [editMessage, setEditMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [deleteMessageSucessfull, setDeleteMessageSucessfull] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [items, setItems] = useState([
    {
      id: "001",
      name: "default name",
      description: "default description",
      status: false,
    },
  ]);

  // Handle input fields
  const handleInput = (e) => {
    setInputTitle(e.target.value);
  };
  const handleInputDescription = (e) => {
    setInputDescription(e.target.value);
  };

  // Submit Form
  const handleSubmit = (e) => {
    setShowList(true);
    setShowNew(true);
    e.preventDefault();
    if (!inputTitle || !inputDescription) {
      alert("Please fill data");
      showList(false);
    } else if (inputTitle && toggleSubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return {
              ...element,
              name: inputTitle,
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
      setItems([allInputTitle, ...items]);
      setInputTitle("");
      setInputDescription("");
      setShowForm(false);
    }
  };

  // Delete
  const handleDelete = (index) => {
    console.log(index);
    const updateItems = items.filter((element) => {
      return index !== element.id;
    });
    setDeleteMessage(true);
    setTimeout(() => {
      setItems(updateItems);
      setDeleteMessage(false);
    }, 2000);
    setDeleteMessageSucessfull(false);
  };

  // Edit
  const handleEdit = (id) => {
    setShowList(false);
    setShowDelete(false);
    setShowNew(false);
    setShowForm(true);
    setToggleSubmit(false);
    let newEditItem = items.find((element) => {
      return element.id === id;
    });
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
      {/* Function - click button new Task */}
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
      {/* Function to Show form */}
      {showForm ? (
        <>
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 rounded">
            <div className="row">
              <div className="text-center">
                <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
              </div>
              <form className="col-12 p-2" onSubmit={handleSubmit}>
                <label htmlFor="title" className="my-2">
                  Enter Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className="w-100 my-1 p-2"
                  onChange={handleInput}
                  value={inputTitle}
                />
                <label htmlFor="description" className="my-2">
                  Enter Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="w-100 my-1 p-2"
                  onChange={handleInputDescription}
                  value={inputDescription}
                />
                <div className="text-center">
                  {toggleSubmit ? (
                    <button className="btn btn-primary my-2">Save</button>
                  ) : (
                    <button className="btn btn-primary my-2">Update</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Function to show the list of tasks */}
      {showList ? (
        <div className="container py-2">
          {deleteMessage ? (
            <p className="text-center text-danger">Item deleted sucessfully!</p>
          ) : (
            ""
          )}
          {items.map((element, index) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded p-2"
                key={element.id}
              >
                <div className="col-12 d-flex justify-content-between align-items-center">
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
                      onClick={() => handleDelete(element.id)}
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
