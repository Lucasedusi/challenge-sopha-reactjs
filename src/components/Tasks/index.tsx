import { ITask } from "../../App";

import { TbClipboardText } from "react-icons/tb";
import { Task } from "../Task";

import "./styles.scss";

interface Props {
	tasks: ITask[];
	onDelete: (id: string) => void;
	onComplete: (id: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete }: Props) {
	const tasksQuantify = tasks.length;
	const completedTasks = tasks.filter((task) => task.isComplete).length;

	return (
		<section className="task-list">
			<header className="header-list">
				<div>
					<p>Tarefas Criadas</p>
					<span>{tasksQuantify}</span>
				</div>

				<div>
					<p className="textPurple">Concluídas</p>
					<span>
						{completedTasks} de {tasksQuantify}
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
		</section>
	);
}
