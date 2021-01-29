import React from "react";
import { render, screen } from "@testing-library/react";
import App from "pages/index";

describe("App", () => {
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("renders without crashing", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Welcome to Next.js!" })).toBeInTheDocument();
  });
});
