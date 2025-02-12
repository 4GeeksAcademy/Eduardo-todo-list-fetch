import React, { useState, useEffect } from 'react';
import Task from "./Task";

const ToDoList = () => {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const loadTask = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/Eduardogp");
    const data = await response.json();
    setTaskList(data.todos);
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <div className="container mt-5 p-4 rounded shadow-sm bg-body-tertiary">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="text-center mb-4">To Do List</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="col-12"
              placeholder="What do you want to do next?"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter" && newTask.trim() !== "") {
                  setTaskList([{ label: newTask }, ...taskList]);
                  setNewTask("");
                }
              }}
            />
            
          </div>
		  <div>
              <button
                className="btn btn-success col-12"
                onClick={() => {
                  if (newTask.trim() !== "") {
                    setTaskList([{ label: newTask }, ...taskList]);
                    setNewTask("");
                  }
                }}
              >
                Add Task
              </button>
            </div>
          {(taskList.length === 0) && <div className="alert alert-info">No more tasks, time for a drink</div>}
          <ul className="list-group list-group-flush">
            {taskList.map((tarea, indice) => (
              <Task
                task={tarea}
                key={indice}
                onRemove={() => {
                  setTaskList(taskList.filter((_tarea, indiceABorrar) => indice !== indiceABorrar));
                }}
              />
            ))}
          </ul>
          <p className="mt-3 text-muted">{taskList.length} items left</p>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;