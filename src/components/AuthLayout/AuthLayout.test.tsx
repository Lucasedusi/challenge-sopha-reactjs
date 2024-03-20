import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthLayout } from ".";

test("renders AuthLayout with children", () => {
	const { getByTestId } = render(
		<AuthLayout>
			<div data-testid="child-component">Child Component</div>
		</AuthLayout>
	);

	const childComponent = getByTestId("child-component");
	expect(childComponent).toBeInTheDocument();
});
