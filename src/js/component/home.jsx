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

    const addNewTask = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/todos/Eduardogp", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if (response.ok) {
            setTaskList(taskList.concat(data));
        }
    };

    const removeTask = async (taskId) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            setTaskList(taskList.filter(task => task.id !== taskId));
        }
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
                        <input type="text" className="col-12" placeholder="What do you want to do next?"
                            value={newTask.label}
                            onChange={(event) => setNewTask({ "label": event.target.value, "is_done": false })}
                            onKeyUp={(event) => {
                                if (event.key === "Enter" && newTask.label.trim() !== "") {
                                    addNewTask();
                                    setNewTask("");
                                }
                            }}
                        />
                    </div>
                    <div>
                        <button className="btn btn-success col-12" onClick={() => {
                            if (newTask.label.trim() !== "") {
                                addNewTask();
                                setNewTask("");
                            }
                        }}> Add Task </button>
                    </div>
                    {(taskList.length === 0) && <div className="alert alert-info">No more tasks, time for a drink</div>}
                    <ul className="list-group list-group-flush">
                        {taskList.map((tarea) => (
                            <Task task={tarea} key={tarea.id} onRemove={() => removeTask(tarea.id)} />
                        ))}
                    </ul>
                    <p className="mt-3 text-muted">{taskList.length} items left</p>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;