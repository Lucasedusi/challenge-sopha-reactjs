import { ReactNode } from "react";

import "./styles.scss";

interface ILoginLayoutProps {
	children: ReactNode;
}

export const AuthLayout: React.FC<ILoginLayoutProps> = ({ children }) => {
	return (
		<div className="container">
			<div className="container-login">
				<div className="wrap-login">{children}</div>
			</div>
		</div>
	);
};
