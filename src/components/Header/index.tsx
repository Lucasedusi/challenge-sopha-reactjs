import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
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
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function onSubmit(data: TaskFormData) {
		onAddTask(data);
		reset();

		setModalIsOpen(false);
	}

	return (
		<header className="header">
			<ToastContainer />

			<button
				className="open-modal-button"
				onClick={() => setModalIsOpen(true)}
			>
				<AiOutlinePlusCircle size={20} />
				Criar Tarefa
			</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				className="modal"
				overlayClassName="overlay"
			>
				<form className="newTaksForm" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("title", { required: true })}
						placeholder="Título da Tarefa"
					/>
					<input
						{...register("description")}
						placeholder="Descrição da Tarefa"
					/>
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
					<button type="submit">Criar</button>
				</form>
			</Modal>
		</header>
	);
}
