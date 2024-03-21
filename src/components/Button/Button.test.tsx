import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from ".";

describe("Button component", () => {
	it("renders with correct text", () => {
		const buttonText = "Click me!";
		const { getByText } = render(<Button>{buttonText}</Button>);
		expect(getByText(buttonText)).toBeInTheDocument();
	});

	it("renders with additional attributes", () => {
		const testId = "test-button";
		const { getByTestId } = render(
			<Button data-testid={testId}>Click me!</Button>
		);
		const button = getByTestId(testId);
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("type", "button");
	});
});
