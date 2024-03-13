import React, { useState } from "react";
import Modal from "react-modal"; // Importar o componente Modal do react-modal
import { ITask } from "../../App";

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
	const [editedTask, setEditedTask] = useState<Partial<ITask>>(initialTask);

	const handleSave = () => {
		onSave(editedTask);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className="modal"
			overlayClassName="overlay"
		>
			<div className="newTaksForm">
				<span className="close" onClick={onClose}>
					&times;
				</span>
				<h2>Edit Task</h2>
				<input
					type="text"
					value={editedTask.title || ""}
					onChange={(e) =>
						setEditedTask({ ...editedTask, title: e.target.value })
					}
				/>
				<input
					type="text"
					value={editedTask.description || ""}
					onChange={(e) =>
						setEditedTask({ ...editedTask, description: e.target.value })
					}
				/>
				<input
					type="date"
					value={editedTask.dueDate || ""}
					onChange={(e) =>
						setEditedTask({ ...editedTask, dueDate: e.target.value })
					}
				/>
				<select
					value={editedTask.priority || ""}
					onChange={(e) =>
						setEditedTask({ ...editedTask, priority: e.target.value })
					}
				>
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
				<button onClick={handleSave}>Save</button>
			</div>
		</Modal>
	);
};

export default EditModal;
