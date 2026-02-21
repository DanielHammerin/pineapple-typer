import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app without crashing", () => {
  render(<App />);
});

test("renders the timer options", () => {
  render(<App />);
  expect(screen.getAllByText("30").length).toBeGreaterThan(0);
  expect(screen.getByText("60")).toBeInTheDocument();
  expect(screen.getByText("120")).toBeInTheDocument();
});
