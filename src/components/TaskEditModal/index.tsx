import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import {} from "../../pages/Home";

import { IoClose } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { ITask } from "../../@types/Tasks";
import "./styles.scss";

interface Props {
	isOpen: boolean;
	initialTask: ITask;
	onClose: () => void;
	onSave: (editedTask: Partial<ITask>) => void;
}

const EditModal: React.FC<Props> = ({
	isOpen,
	initialTask,
	onClose,
	onSave,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Partial<ITask>>({ defaultValues: initialTask });

	const handleSave = (data: Partial<ITask>) => {
		onSave(data);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			overlayClassName="overlay"
			className="modal"
			aria={{
				labelledby: "modal-title",
				describedby: "modal-description",
			}}
		>
			<form
				className="form-add-task"
				onSubmit={handleSubmit(handleSave)}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<div className="form-add-task-header">
					<h2>Adicionar Tarefa</h2>
					<span className="close" onClick={onClose} role="button" tabIndex={0}>
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
							aria-invalid={errors.description ? "true" : "false"}
						/>
					</div>
				</div>

				<input
					{...register("dueDate")}
					type="date"
					placeholder="Data de Vencimento"
					aria-label="Data de Vencimento"
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
					<option value="Trabalho" label="Trabalho">
						Trabalho
					</option>
					<option value="Estudos" label="Estudos">
						Estudos
					</option>
					<option value="Compras" label="Compras">
						Compras
					</option>
					<option value="Outros" label="Outros">
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
					<option value="Urgente" label="Urgente">
						Urgente
					</option>
					<option value="Não Urgente" label="Não Urgente">
						Não Urgente
					</option>
				</select>
				<button type="submit">Criar</button>
			</form>
		</Modal>
	);
};

export default EditModal;
