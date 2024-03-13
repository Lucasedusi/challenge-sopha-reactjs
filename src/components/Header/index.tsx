import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import { IoClose } from "react-icons/io5";

import Modal from "react-modal";
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
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { register, handleSubmit, reset, formState, clearErrors } =
		useForm<TaskFormData>();
	const { errors } = formState;

	function onSubmit(data: TaskFormData) {
		onAddTask(data);

		setModalIsOpen(false);
		reset();
	}

	return (
		<header className="header">
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
				<form className="form-add-task" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-add-task-header">
						<h2>Adicionar Tarefa</h2>
						<span className="close" onClick={() => setModalIsOpen(false)}>
							<IoClose color="#fff" />
						</span>
					</div>

					<div className="form-add-inputs-title-description">
						<div>
							<input
								{...register("title", { required: true })}
								placeholder="Título da Tarefa"
							/>
							{errors.title && errors.title.type === "required" && (
								<div className="input-error">
									<RiErrorWarningFill size={22} color="#fa5c7c" />
								</div>
							)}
						</div>

						<div>
							<input
								{...register("description", { required: true })}
								placeholder="Descrição da Tarefa"
							/>
						</div>
					</div>

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
