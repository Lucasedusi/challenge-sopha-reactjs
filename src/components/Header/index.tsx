import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AiOutlinePlusCircle } from "react-icons/ai";

import "./styles.scss";

interface Props {
	onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: Props) {
	const [title, setTitle] = useState("");

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		if (!title) {
			toast.warn("Escreva alguma coisa", {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return;
		}

		onAddTask(title);
		setTitle("");
	}

	function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
		setTitle(event.target.value);
	}

	return (
		<header className="header">
			<form className="newTaksForm" onSubmit={handleSubmit}>
				<input
					placeholder="Adicione uma tarefa"
					onChange={onChangeTitle}
					value={title}
				/>
				<button>
					Criar
					<AiOutlinePlusCircle size={20} />
				</button>
			</form>

			<ToastContainer />
		</header>
	);
}
