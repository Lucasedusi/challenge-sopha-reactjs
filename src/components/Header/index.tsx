import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.scss";

export interface TaskFormData {
	title: string;
	description: string;
	dueDate: string;
	priority: string;
}

interface Props {
	onAddTask: (taskData: TaskFormData) => void;
}

export function Header({ onAddTask }: Props) {
	const { register, handleSubmit, reset } = useForm<TaskFormData>();

	function onSubmit(data: TaskFormData) {
		onAddTask(data);
		reset();
	}

	return (
		<header className="header">
			<ToastContainer />
			<form className="newTaksForm" onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("title", { required: true })}
					placeholder="Título da Tarefa"
				/>
				<input {...register("description")} placeholder="Descrição da Tarefa" />
				<input
					{...register("dueDate")}
					type="date"
					placeholder="Data de Vencimento"
				/>
				<select {...register("priority")} defaultValue="">
					<option value="" disabled hidden>
						Prioridade
					</option>
					<option value="low" label="Baixo">
						Low
					</option>
					<option value="medium" label="Médio">
						Medium
					</option>
					<option value="high" label="Urgente">
						High
					</option>
				</select>
				<button type="submit">
					Criar
					<AiOutlinePlusCircle size={20} />
				</button>
			</form>
		</header>
	);
}
