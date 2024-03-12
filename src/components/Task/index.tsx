import { useState } from "react";
import { ITask } from "../../App";

import EditModal from "../TaskEditModal";
import "./styles.scss";

interface Props {
	task: ITask;
	onDelete: (taskId: string) => void;
	onComplete: (taskId: string) => void;
	onEdit: (taskId: string, editedTask: Partial<ITask>) => void;
}

export function Task({ task, onDelete, onComplete, onEdit }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<div className="task">
			<div>
				<p className={task.isComplete ? "textCompleted" : ""}>{task.title}</p>
				<p>{task.description}</p>
				<p>{task.dueDate}</p>
				<p>{task.priority}</p>
			</div>
			<button onClick={toggleModal}>Edit</button>
			<button onClick={() => onDelete(task.id)}>Delete</button>
			<button onClick={() => onComplete(task.id)}>Complete</button>

			<EditModal
				isOpen={isModalOpen}
				initialTask={task}
				onClose={toggleModal}
				onSave={(editedTask) => {
					onEdit(task.id, editedTask);
				}}
			/>
		</div>
	);
}
