import React from "react";
import { useForm } from "react-hook-form"; // Importar o hook useForm do react-hook-form
import Modal from "react-modal"; // Importar o componente Modal do react-modal
import { ITask } from "../../App";

import { IoClose } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
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
		>
			<form className="form-add-task" onSubmit={handleSubmit(handleSave)}>
				<div className="form-add-task-header">
					<h2>Adicionar Tarefa</h2>
					<span className="close" onClick={onClose}>
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
	);
};

export default EditModal;
