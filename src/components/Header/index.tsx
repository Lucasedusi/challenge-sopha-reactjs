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
	onCategoryChange: (category: string) => void;
}

export function Header({ onAddTask, onCategoryChange }: Props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");

	const { register, handleSubmit, reset, formState, clearErrors } =
		useForm<ITaskFormData>();
	const { errors } = formState;

	function onSubmit(data: ITaskFormData) {
		onAddTask(data);

		setModalIsOpen(false);
		reset();
	}

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const category = event.target.value;
		setSelectedCategory(category);
		onCategoryChange(category);
	};

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

			<select
				value={selectedCategory}
				onChange={handleSelectChange}
				aria-label="Filtrar por categoria"
				className="category-select"
			>
				<option value="">Todas as Categorias</option>
				<option value="work">Trabalho</option>
				<option value="studies">Estudos</option>
				<option value="leisure">Lazer</option>
				<option value="others">Outros</option>
			</select>

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
								<div className="input-error-add">
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
						{...register("category")}
						defaultValue=""
						aria-label="Categoria"
						aria-invalid={errors.category ? "true" : "false"}
					>
						<option value="" disabled hidden>
							Categoria
						</option>
						<option value="work" label="Trabalho">
							Trabalho
						</option>
						<option value="studies" label="Estudos">
							Estudos
						</option>
						<option value="leisure" label="Lazer">
							Lazer
						</option>
						<option value="others" label="Outros">
							Outros
						</option>
					</select>

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
