import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdBlock, MdEdit } from "react-icons/md";

import { ITask } from "../../@types/Tasks";
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
	const [isBlocked, setIsBlocked] = useState(false);

	useEffect(() => {}, [task.isComplete]);

	const handleCheckboxClick = () => {
		setIsChecked(!isChecked);
		onComplete(task.id);
	};

	const handleBlockClick = () => {
		setIsBlocked(true);
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
			<div className={`task-list-container ${isBlocked ? "blocked" : ""}`}>
				<div
					className={`check-container ${isChecked ? "checked" : ""}`}
					onClick={handleCheckboxClick}
					aria-label={
						isChecked ? "Desmarcar tarefa" : "Marcar tarefa como concluída"
					}
					role="button"
				>
					{isChecked ? (
						<FaCheck className="check-icon" aria-hidden="true" />
					) : (
						<div className="check-icon" aria-hidden="true" />
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
							<p className="date-task">{task.category}</p>
							<p className="priority-task">{task.priority}</p>
						</div>

						<div className="task-actions">
							<MdBlock
								size={28}
								color="#91989D"
								onClick={handleBlockClick}
								aria-label="Bloquear tarefa"
								role="button"
								tabIndex={0}
							/>
							<MdEdit
								size={28}
								color="#91989D"
								onClick={toggleModal}
								aria-label="Editar tarefa"
								role="button"
								tabIndex={0}
							/>
							<FaTrash
								size={28}
								color="#91989D"
								onClick={() => onDelete(task.id)}
								aria-label="Excluir tarefa"
								role="button"
								tabIndex={0}
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
