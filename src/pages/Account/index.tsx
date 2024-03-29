import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { Api } from "../../services/api";

import { IAccount } from "../../@types/User";
import "./styles.scss";

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

	const { register, handleSubmit, formState } = useForm<IAccount>({
		resolver: yupResolver(accountSchema),
	});

	const { errors } = formState;

	const navigate = useNavigate();

	const handleCreateUser: SubmitHandler<IAccount> = async () => {
		try {
			const data = {
				name: name,
				email: email,
				password: password,
			};

			await Api.post("create", data);

			navigate("/");
		} catch (error) {
			console.error("Erro ao cadastrar usuário:", error);
		}
	};

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit(handleCreateUser)}>
				<div className="account-form-title">
					<h2>Cadastre-se</h2>
					<p>Digite suas informações para acessar seu painel tarefas</p>
				</div>

				<div className="account-form-input-container">
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
							aria-invalid={errors.name ? "true" : "false"}
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
							aria-invalid={errors.password ? "true" : "false"}
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
							aria-invalid={errors.confirPassword ? "true" : "false"}
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

				<Button type="submit">Cadastrar</Button>
			</form>
			<div className="footer-account">
				<Link to="/" className="footer-account-redirect">
					<FaCircleChevronLeft size={14} />
					Retornar
				</Link>
			</div>
		</AuthLayout>
	);
}
