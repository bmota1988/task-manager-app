import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const TaskHome = () => {
  const navigate = useNavigate();

  // Hook useState
  const [cookies, removeCookie] = useCookies([]);
  // eslint-disable-next-line
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [priority, setPriority] = useState(false);
  const [items, setItems] = useState([]);

  // Token verification and Logout
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          alert("Welcome to Task Manager App");
        } else {
          removeCookie("token");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        removeCookie("token");
      }
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

  // Handle date and time change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // Handle priority change
  const handlePriorityChange = () => {
    setPriority(!priority);
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
              id: new Date().getTime().toString(),
              title: inputTitle,
              description: inputDescription,
              date: selectedDate,
              time: selectedTime,
              priority: priority,
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
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        description: inputDescription,
        date: selectedDate,
        time: selectedTime,
        priority: priority,
      };
      setItems([...items, newItem]);
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

  // DatePicker and TimePicker format

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect="true">
        <Container className="justify-content-space-around">
          <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="position-absolute top-50 start-50 translate-middle mt-5">
        {showNew ? (
          <Container className="mb-3">
            <Button variant="success" placement="bottom" onClick={handleAdd}>
              Add New Task
            </Button>
          </Container>
        ) : (
          ""
        )}

        {showForm ? (
          <Container className="border rounded shadow p-3 mb-5 bg-light rounded">
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center">
                {toggleSubmit ? "Add Task" : "Edit Task"}
              </h2>
              <Form.Group className="mb-3">
                <Form.Label>Enter title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={handleInput}
                  value={inputTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Enter description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="description"
                  onChange={handleInputDescription}
                  value={inputDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Date:</Form.Label>
                <br />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Time:</Form.Label>
                <br />
                <DatePicker
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  locale={"ca"}
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Mark as Priority"
                  checked={priority}
                  onChange={handlePriorityChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  {toggleSubmit ? "Add" : "Update"}
                </Button>
              </div>
            </Form>
          </Container>
        ) : (
          ""
        )}

        {showList ? (
          <Container className="py-2">
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
                  className="row border rounded shadow p-3 mb-3 bg-light 
                  rounded p-2"
                  key={element.id}
                >
                  <div
                    className="col-12 d-flex justify-content-between 
                  align-items-center"
                  >
                    <div>
                      <h4>{element.name}</h4>
                      <p>{element.description}</p>
                    </div>
                    <div>
                      <p>Date: {new Date(element.date).toLocaleDateString()}</p>
                      <p>
                        Time:{" "}
                        {new Date(element.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>Priority: {element.priority ? "High" : "Low"}</p>
                    </div>
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(element.id)}
                      >
                        Edit
                      </Button>
                      {showDelete ? (
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => handleDelete(element)}
                        >
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Container>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default TaskHome;
