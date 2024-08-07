import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders hello world as a test", () => {
    //Arrange
    render(<Greeting />);

    //Act
    //...

    //Assert
    const helloWorldELement = screen.getByText(/Hello world/i);
    expect(helloWorldELement).toBeInTheDocument();
  });

  test("renders good to see you if the button was not clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText(/good to see you/i);
    expect(outputElement).toBeInTheDocument();
  });

  test("renders changed if the button was clicked", () => {
    //Arrange
    render(<Greeting />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.getByText(/changed/i);
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render good to see you if the button was clicked', () => {
    //Arrange
    render(<Greeting />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.queryByText(/good to see you/i);
    expect(outputElement).toBeNull();
  })
});
