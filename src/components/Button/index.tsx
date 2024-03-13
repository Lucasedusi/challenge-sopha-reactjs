import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./styles.scss";

interface ILayoutComponentsProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button: React.FC<ILayoutComponentsProps> = ({
	children,
	...rest
}) => {
	return (
		<button className="btn-primary" type="button" {...rest}>
			{children}
		</button>
	);
};
