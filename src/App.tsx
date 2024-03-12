import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { Header, TaskFormData } from "./components/Header";
import { Tasks } from "./components/Tasks";

export interface ITask {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: string;
	isComplete: boolean;
}

function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		const response = await axios.get("http://localhost:3001/tasks");
		setTasks(response.data);
	};

	const addTask = async (taskData: TaskFormData) => {
		const newTask = { ...taskData, id: uuid(), isComplete: false };
		await axios.post("http://localhost:3001/tasks", newTask);
		fetchTasks();
		reset();
	};

	const editTask = async (id: string, editedTask: Partial<ITask>) => {
		await axios.put(`http://localhost:3001/tasks/${id}`, editedTask);
		fetchTasks();
	};

	const removeTask = async (id: string) => {
		await axios.delete(`http://localhost:3001/tasks/${id}`);
		fetchTasks();
	};

	const toggleTaskCompletedById = async (id: string) => {
		const taskToUpdate = tasks.find((task) => task.id === id);
		if (taskToUpdate) {
			const updatedTask = {
				...taskToUpdate,
				isComplete: !taskToUpdate.isComplete,
			};
			await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);
			fetchTasks();
		}
	};

	return (
		<>
			<Header onAddTask={addTask} />

			<Tasks
				tasks={tasks}
				onDelete={removeTask}
				onComplete={toggleTaskCompletedById}
				onEdit={editTask}
			/>
		</>
	);
}

export default App;
