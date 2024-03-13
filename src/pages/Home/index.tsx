import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { ITask, ITaskFormData } from "../../@types/Tasks";
import { Header } from "../../components/Header";
import { Tasks } from "../../components/Tasks";

export function Home() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
	const { reset } = useForm();

	const fetchTasks = async () => {
		const response = await axios.get("http://localhost:3001/tasks");

		setTasks(response.data);
		setFilteredTasks(response.data);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const addTask = async (taskData: ITaskFormData) => {
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

			const updatedTasks = tasks.map((task) =>
				task.id === id ? { ...task, isComplete: !task.isComplete } : task
			);

			setTasks(updatedTasks);
			setFilteredTasks(updatedTasks);
		}
	};

	const onMove = async (dragIndex: number, hoverIndex: number) => {
		const updatedTasks = [...tasks];
		const draggedTask = updatedTasks[dragIndex];
		updatedTasks.splice(dragIndex, 1);
		updatedTasks.splice(hoverIndex, 0, draggedTask);
		setTasks(updatedTasks);

		await axios.put("http://localhost:3001/tasks", updatedTasks);
		fetchTasks();
	};

	const onCategoryChange = (category: string) => {
		if (category === "") {
			setFilteredTasks(tasks);
		} else {
			const filtered = tasks.filter((task) => task.category === category);
			setFilteredTasks(filtered);
		}
	};

	return (
		<>
			<Header onAddTask={addTask} onCategoryChange={onCategoryChange} />

			<Tasks
				tasks={filteredTasks}
				onDelete={removeTask}
				onComplete={toggleTaskCompletedById}
				onEdit={editTask}
				onMove={onMove}
			/>
		</>
	);
}
