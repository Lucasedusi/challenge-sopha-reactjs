import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdBlock, MdEdit } from "react-icons/md";

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
			<div className="task-list-container">
				<label className="checkContainer">
					<input
						type="checkbox"
						checked={task.isComplete}
						onChange={() => onComplete(task.id)}
					/>
					<span className="checkMark">
						{task.isComplete ? <BsFillCheckCircleFill /> : <div />}
					</span>
				</label>

				<div className="task-info-generals">
					<p className={task.isComplete ? "textCompleted" : "title-task"}>
						{task.title}
					</p>
					<p className="description-task">{task.description}</p>
					<p className="date-task">{task.dueDate}</p>
					<p className="priority-task">{task.priority}</p>
				</div>
			</div>

			<div className="task-actions">
				<MdBlock size={22} color="#91989D" />
				<MdEdit size={22} color="#91989D" onClick={toggleModal} />
				<FaTrash size={20} color="#91989D" onClick={() => onDelete(task.id)} />
			</div>

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
