import React, { useState, useEffect } from 'react';
import Task from "./Task";


const ToDoList = () => {
	const [newTask, setNewTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const loadTask = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/Eduardo");
		const data = await response.json();
		setTaskList(data.todos);
	};

	useEffect(()=>{
		loadTask();
	},[])

	useEffect(() => {
		loadTask();
	}, []);

	return (
		<div className="container text-center border col-6 bg-light">
			<input 
				type="text" 
				value={newTask} 
				placeholder="What do you want to do next?" 
				onChange={(event) => setNewTask(event.target.value)} 
				onKeyUp={(event) => {
					if (event.key === "Enter" && newTask.trim() !== "") {
						setTaskList([newTask, ...taskList]);
						setNewTask("");
					}
				}}
			/>
			{(taskList.length === 0) && <div>No more tasks, time for a drink</div>}
			{taskList.map((tarea, indice) => (
				<Task 
					task={tarea} 
					key={indice} 
					onRemove={() => {
						setTaskList(taskList.filter((_tarea, indiceABorrar) => indice !== indiceABorrar));
					}}
				/>
			))}
			<p>{taskList.length} items left</p>
		</div>
	);
};

export default ToDoList;