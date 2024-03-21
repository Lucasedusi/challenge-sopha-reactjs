import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthLayout } from ".";

describe("AuthLayout Component", () => {
	it("renders children element", () => {
		const { getByTestId } = render(
			<AuthLayout>
				<div data-testid="child-element">Child Element</div>
			</AuthLayout>
		);

		const childElement = getByTestId("child-element");
		expect(childElement).toBeInTheDocument();
	});

	it("renders container and wrap elements", () => {
		const { container } = render(
			<AuthLayout>
				<div data-testid="child-element">Child Element</div>
			</AuthLayout>
		);

		const containerElement = container.querySelector(".container");
		const containerLogin = container.querySelector(".container-login");
		const wrapElement = container.querySelector(".wrap-login");

		expect(containerElement).toBeInTheDocument();
		expect(containerLogin).toBeInTheDocument();
		expect(wrapElement).toBeInTheDocument();
	});
});
