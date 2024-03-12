import { ITask } from "../../App";
import { Task } from "../Task";

import "./styles.scss";

interface Props {
	tasks: ITask[];
	onDelete: (id: string) => void;
	onComplete: (id: string) => void;
	onEdit: (id: string, editedTask: Partial<ITask>) => void;
}

export function Tasks({ tasks, onDelete, onComplete, onEdit }: Props) {
	return (
		<section className="task-list">
			<header className="header-list">
				<div>
					<p>Tarefas Criadas</p>
					<span>{tasks.length}</span>
				</div>
				<div>
					<p className="textPurple">Concluídas</p>
					<span>
						{tasks.filter((task) => task.isComplete).length} de {tasks.length}
					</span>
				</div>
			</header>
			<div className="list">
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onDelete={onDelete}
						onComplete={onComplete}
						onEdit={onEdit}
					/>
				))}
			</div>
		</section>
	);
}
