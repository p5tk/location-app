import React from "react";
import { render } from "@testing-library/react-native";
import Home from "../app/home";
jest.mock("expo-secure-store");
jest.mock("react-native-maps", () => ({
  __esModule: true,
  default: jest.fn(() => null),
  Marker: jest.fn(() => null),
  Callout: jest.fn(() => null),
}));

describe("Home Component", () => {
  it("should render the logout button", () => {
    const { getByText } = render(<Home />);

    // Check if the logout button is rendered
    expect(getByText("Logout")).toBeTruthy();
  });
});
