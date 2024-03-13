import { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdBlock, MdEdit } from "react-icons/md";

import { ITask } from "../../App";

import EditModal from "../TaskEditModal";
import "./styles.scss";

interface Props {
	task: ITask;
	onDelete: (taskId: string) => void;
	onComplete: (taskId: string) => void;
	onEdit: (taskId: string, editedTask: Partial<ITask>) => void;
	onMove: (dragIndex: number, hoverIndex: number) => void;
	index: number;
}

export function Task({
	task,
	onDelete,
	onComplete,
	onEdit,
	onMove,
	index,
}: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isChecked, setIsChecked] = useState(task.isComplete);

	const handleCheckboxClick = () => {
		setIsChecked(!isChecked);
		onComplete(task.id);
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData("text/plain", index.toString());
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const dragIndex = Number(e.dataTransfer.getData("text/plain"));
		const hoverIndex = index;
		if (dragIndex !== hoverIndex) {
			onMove(dragIndex, hoverIndex);
		}
	};
	return (
		<div
			className="task"
			draggable
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<div className="task-list-container">
				<div
					className={`checkContainer ${isChecked ? "checked" : ""}`}
					onClick={handleCheckboxClick}
				>
					{isChecked ? (
						<FaCheck className="checkIcon" />
					) : (
						<div className="checkIcon" />
					)}
				</div>

				<div className="task-info-title">
					<p className={task.isComplete ? "textCompleted" : "title-task"}>
						{task.title}
					</p>

					<div className="task-infos-generals">
						<div>
							<p className="description-task">{task.description}</p>
							<p className="date-task">{task.dueDate}</p>
							<p className="priority-task">{task.priority}</p>
						</div>

						<div className="task-actions">
							<MdBlock size={28} color="#91989D" />
							<MdEdit size={28} color="#91989D" onClick={toggleModal} />
							<FaTrash
								size={28}
								color="#91989D"
								onClick={() => onDelete(task.id)}
							/>
						</div>
					</div>
				</div>
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
