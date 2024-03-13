import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { AuthContext } from "../../context/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RiErrorWarningFill } from "react-icons/ri";
import "./styles.scss";

interface IUser {
	email: string;
	password: string;
}

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required("E-mail Obrigatório")
		.email("E-mail ou Senha inválidos"),
	password: yup
		.string()
		.required("Senha Obrigatória")
		.min(2, "E-mail ou Senha inválidos"),
});

export function Login(): ReactNode {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signIn, signed } = useContext(AuthContext);

	const { register, handleSubmit, formState } = useForm<IUser>({
		resolver: yupResolver(loginSchema),
	});

	const { errors } = formState;

	const navigate = useNavigate();

	const handleSignIn = async () => {
		const data = {
			email: email,
			password: password,
		};

		await signIn(data);
	};

	if (signed) {
		navigate("/home");
	} else {
		return (
			<AuthLayout>
				<form onSubmit={handleSubmit(handleSignIn)}>
					<div className="login-form-title">
						<h2>Login</h2>
						<p>
							Digite seu endereço de e-mail e senha para acessar seu painel
							tarefas
						</p>
					</div>

					<div className="login-form-input-container">
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
								<RiErrorWarningFill size={22} color="#fa5c7c" />
							</div>
						)}
					</div>

					<Button type="submit">Entrar</Button>
				</form>

				<div className="footer-account">
					Ainda não tem conta?
					<Link to="/account" className="footer-account-redirect">
						Cadastre-se
					</Link>
				</div>
			</AuthLayout>
		);
	}
}
