import React, { useState } from "react";
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

	return isOpen ? (
		<div className="modal">
			<div className="modal-content">
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
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<button onClick={handleSave}>Save</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	) : null;
};

export default EditModal;
