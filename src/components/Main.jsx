import React, { useEffect, useState } from 'react';
import "./main.css";
import axios from "axios";
import Task from './Task';

const Header = () => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([])
  console.log(tasks);

  const loadData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/tasks")
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !date || !status || !user) {
      alert("Input Blank")
    } else {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/tasks", {
          Content: content,
          Due_date: date,
          Status: status,
          User_name: user
        });
        const Newtask = response.data;
        console.log("DATA", tasks);
        setContent("");
        setDate("");
        setStatus("");
        setUser("");
        setTasks([...tasks, Newtask]);
        loadData();
      } catch (error) {
        console.error(error);
      }
    }

  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tasks/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    console.log("updatedTask",updatedTask);
    try {
      await axios.put(`http://localhost:8000/api/v1/tasks/${id}`, updatedTask);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='main-header'>
      <form action=""
        onSubmit={(event) => handleSubmit(event)}
        className='main-form'>
        <div className="input-group flex-nowrap input-container">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="input-group flex-nowrap input-container">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="date"
            required
            className="form-control"
            placeholder="Content"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <select
          className="form-select select-container"
          required
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option selected>Choose...</option>
          <option value="Pending">Pending</option>
          <option value="Fulfil">Fulfil</option>
          <option value="Reject">Reject</option>
        </select>

        <div className="input-group flex-nowrap input-container">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Username"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
      </form>
      <section>
        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">#</th>
              <th style={{ width: "25%" }} scope="col">Content</th>
              <th style={{ width: "15%" }} scope="col">Due date</th>
              <th style={{ width: "15%" }} scope="col">Status</th>
              <th style={{ width: "20%" }} scope="col">Assigned to</th>
              <th colSpan={2} scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item,index) => (
              <Task
                key={item.Task_id}
                index={index}
                tasks={item}
                onUpdate={(updatedTask) => handleUpdateTask(item.Task_id, updatedTask)}
                onDelete={() => handleDeleteTask(item.Task_id)}
              />
            ))}
          </tbody>
        </table>
      </section>

    </div>
  )
}

export default Header;
