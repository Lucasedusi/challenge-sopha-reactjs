import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import { IoClose } from "react-icons/io5";

import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

import { ITaskFormData } from "../../@types/Tasks";
import "./styles.scss";

interface Props {
	onAddTask: (taskData: ITaskFormData) => void;
}

export function Header({ onAddTask }: Props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { register, handleSubmit, reset, formState, clearErrors } =
		useForm<ITaskFormData>();
	const { errors } = formState;

	function onSubmit(data: ITaskFormData) {
		onAddTask(data);

		setModalIsOpen(false);
		reset();
	}

	return (
		<header className="header">
			<button
				className="open-modal-button"
				onClick={() => setModalIsOpen(true)}
				aria-label="Abrir modal de criação de tarefa"
			>
				<AiOutlinePlusCircle size={20} />
				Criar Tarefa
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				className="modal"
				overlayClassName="overlay"
				aria={{
					labelledby: "modal-title",
					describedby: "modal-description",
				}}
			>
				<form
					className="form-add-task"
					onSubmit={handleSubmit(onSubmit)}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<div className="form-add-task-header">
						<h2>Adicionar Tarefa</h2>
						<span
							className="close"
							onClick={() => setModalIsOpen(false)}
							aria-label="Fechar modal"
						>
							<IoClose color="#fff" />
						</span>
					</div>

					<div className="form-add-inputs-title-description">
						<div>
							<input
								{...register("title", { required: true })}
								placeholder="Título da Tarefa"
								aria-label="Título da Tarefa"
								aria-invalid={errors.title ? "true" : "false"}
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
								aria-label="Descrição da Tarefa"
								aria-invalid={errors.priority ? "true" : "false"}
							/>
						</div>
					</div>

					<input
						{...register("dueDate")}
						type="date"
						placeholder="Data de Vencimento"
						aria-label="Data de Vencimento para executar tarefa"
					/>
					<select
						{...register("priority")}
						defaultValue=""
						aria-label="Prioridade"
						aria-invalid={errors.priority ? "true" : "false"}
					>
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
