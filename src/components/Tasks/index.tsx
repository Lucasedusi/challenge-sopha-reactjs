import { IoMdExit } from "react-icons/io";
import { TbClipboardText } from "react-icons/tb";
import { Task } from "../Task";

import { useContext } from "react";
import { ITask } from "../../@types/Tasks";
import { AuthContext } from "../../context/auth";
import "./styles.scss";

interface Props {
	tasks: ITask[];
	onDelete: (id: string) => void;
	onComplete: (id: string) => void;
	onEdit: (id: string, editedTask: Partial<ITask>) => void;
	onMove: (dragIndex: number, hoverIndex: number) => void;
}

export function Tasks({ tasks, onDelete, onComplete, onEdit, onMove }: Props) {
	const { signOut } = useContext(AuthContext);

	const handleSignOut = () => {
		signOut();
	};

	return (
		<section className="task-list" aria-label="Lista de Tarefas">
			<div className="list">
				{tasks.map((task, index) => (
					<Task
						key={task.id}
						task={task}
						onDelete={onDelete}
						onComplete={onComplete}
						onEdit={onEdit}
						onMove={onMove}
						index={index}
					/>
				))}

				{tasks.length <= 0 && (
					<section className="empty">
						<TbClipboardText size={50} />

						<div>
							<p>Você não tem nenhuma tarefa cadastrada</p>
							<span>Crie tarefas e organize seu dia</span>
						</div>
					</section>
				)}
			</div>

			<div className="header-list">
				<div>
					<p>Tarefas Criadas</p>
					<span>{tasks.length}</span>
				</div>

				<div>
					<p className="text-success" aria-label="Número de Tarefas Concluídas">
						Concluídas
					</p>
					<span>
						{tasks.filter((task) => task.isComplete).length} de {tasks.length}
					</span>
				</div>

				<div className="sign-out">
					<IoMdExit onClick={handleSignOut} color="#fa5c7c" size={22} />
				</div>
			</div>
		</section>
	);
}
