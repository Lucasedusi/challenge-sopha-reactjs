import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { Api } from "../../services/api";

import "./styles.scss";

interface IUser {
	name: string;
	email: string;
	password: string;
	confirPassword: string;
}

const accountSchema = yup.object().shape({
	name: yup.string().required("Obrigatório"),
	email: yup.string().required("Obrigatório").email("E-mail Inválido"),
	password: yup.string().required("Obrigatório").min(2, "Mínimo 2 caracteres"),
	confirPassword: yup
		.string()
		.required("Obrigatório")
		.min(2, "Mínimo 2 caracteres")
		.oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
});

export function Account() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirPassword, setConfirPassword] = useState("");

	const { register, handleSubmit, formState, clearErrors } = useForm<IUser>({
		resolver: yupResolver(accountSchema),
	});

	const { errors } = formState;

	const navigate = useNavigate();

	const handleCreateUser: SubmitHandler<IUser> = async () => {
		try {
			const data = {
				name: name,
				email: email,
				password: password,
			};

			await Api.post("create", data);

			navigate("/login");
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		}
	};

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit(handleCreateUser)}>
				<div className="login-form-title">
					<h2>Cadastre-se</h2>
					<p>Digite suas informações para acessar seu painel tarefas</p>
				</div>

				<div className="login-form-input-container">
					<div className="wrap-input">
						<input
							className={name !== "" ? "has-value input" : "input"}
							{...register("name")}
							onChange={(e) => setName(e.target.value)}
						/>
						<span className="focus-input" data-placeholder="Nome"></span>
					</div>

					{errors.name?.message && (
						<div className="input-error">
							<RiErrorWarningFill size={22} color="#fa5c7c" />
						</div>
					)}

					<div className="wrap-input">
						<input
							className={email !== "" ? "has-value input" : "input"}
							{...register("email")}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<span className="focus-input" data-placeholder="Email"></span>
					</div>

					{errors.email?.message && (
						<div className="input-error">
							<RiErrorWarningFill size={22} color="#fa5c7c" />
						</div>
					)}

					<div className="wrap-input">
						<input
							type="password"
							className={password !== "" ? "has-value input" : "input"}
							{...register("password")}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className="focus-input" data-placeholder="Senha"></span>
					</div>

					{errors.password?.message && (
						<div className="input-error">
							<span className="error-password">{errors.password?.message}</span>
						</div>
					)}

					<div className="wrap-input">
						<input
							type="password"
							className={confirPassword !== "" ? "has-value input" : "input"}
							{...register("confirPassword")}
							onChange={(e) => setConfirPassword(e.target.value)}
						/>
						<span className="focus-input" data-placeholder="Senha"></span>
					</div>

					{errors.confirPassword?.message && (
						<div className="input-error">
							<span className="error-password">
								{errors.confirPassword?.message}
							</span>
						</div>
					)}
				</div>

				<Button type="submit">Entrar</Button>
			</form>
		</AuthLayout>
	);
}
