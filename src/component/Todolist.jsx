import "bootstrap/dist/css/bootstrap.css";
import config from "../../config.json";
const { SERVER_API } = config;
import "../component/Todo.css";
import React from "react";
import { useState, useEffect } from "react";
import DeleteTodo from "./DeleteTodo";
import EditToDo from "./EditToDo";

function Todolist() {
  const [works, setWorks] = useState([]);
  const [newWorkName, setNewWorkName] = useState("");
  console.log(newWorkName);

  useEffect(() => {
    getWork();
  }, []);
  const handleChangeInput = (e) => {
    setNewWorkName(e.target.value);
  };
  const getWork = async () => {
    const response = await fetch(`${SERVER_API}/works`);
    if (response.ok) {
      const works = await response.json();
      setWorks(works); // Cập nhật state với dữ liệu từ API
      console.log(works);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: newWorkName,
      trang_thai: 1,
    };
    const response = await fetch(`${SERVER_API}/works`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      const newWork = await response.json();
      getWork();
      setNewWorkName("");
    }
  };
  const statusOptions = {
    1: "Todo",
    2: "Doing",
    3: "Pending",
    4: "Done",
  };
  const handleStatusChange = async (e, work) => {
    const newStatus = parseInt(e.target.value);
    const updatedWork = { ...work, trang_thai: newStatus }; 
      const response = await fetch(`${SERVER_API}/works/${work.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWork),
      });
  
      if (response.ok) {
        getWork();
      } 
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form
                    onSubmit={handleSubmit}
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  >
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          required
                          onChange={handleChangeInput}
                          value={newWorkName}
                          type="text"
                          id="form1"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                  <table className="table mb-4">
                    <thead className="text-center">
                      <tr>
                        <th width="5%" scope="col">
                          No.
                        </th>
                        <th width="45%" scope="col">
                          Todo item
                        </th>
                        <th></th>
                        <th width="22%" scope="col">
                          Status
                        </th>
                        <th width="30%" scope="col">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {works.map((work, index) => (
                        <tr key={index} className="text-center">
                          <th scope="row">{index + 1}</th>
                          <td>
                            <p className="dodai">{work.name}   </p>
                          </td>
                          <td>
                          <EditToDo getWork={getWork} data={work} />
                          </td>
                          <td>
                            <select
                              value={work.trang_thai}
                              onChange={(e) => handleStatusChange(e, work)}
                              className={`form-select select${work.trang_thai}`}
                            >
                              {Object.entries(statusOptions).map(
                                ([value, label]) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                )
                              )}
                            </select>
                          </td>
                          <td>
                            <DeleteTodo getWork={getWork} data={work} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Todolist;
