import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserAddFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/Button";
import { AuthContext } from "../../context/auth";

interface IUser {
	email: string;
	password: string;
}

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signIn, signed } = useContext(AuthContext);

	const { register, handleSubmit, formState } = useForm<IUser>({});

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
		return navigate("/home");
	} else {
		return (
			<AuthLayout>
				<form onSubmit={handleSubmit(handleSignIn)} className="login-form">
					<span className="login-form-title">
						{/* <img src={logoImg} alt="Jovem Programador" /> */}
					</span>

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
							<span>{errors.email?.message}</span>
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
							<span>{errors.password?.message}</span>
						</div>
					)}

					<div className="container-login-form-btn">
						<Button type="submit" className="login-form-btn">
							Entrar
						</Button>
					</div>

					<div className="text-center">
						<RiUserAddFill fontSize={17} color="#fff" />
						<Link to="/register" className="link-password">
							Criar Conta
						</Link>
					</div>
				</form>
			</AuthLayout>
		);
	}
}
