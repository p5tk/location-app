import {
  render,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import Login from "../app/index";
import axios from "axios";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
}));

jest.mock("expo-router", () => ({
  push: jest.fn(),
}));

jest.mock("axios");

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for rendering the component correctly
  it("renders the login form correctly", () => {
    render(<Login />);

    // Check if username and password fields and the login button exist
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });

  // Test for correct credentials
  it("calls handleLogin with correct credentials on submit", async () => {
    axios.post.mockResolvedValue({
      data: {
        access_token: "mockAccessToken",
        refresh_token: "mockRefreshToken",
      },
    });

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    // Simulate user entering credentials
    fireEvent.changeText(usernameInput, "user");
    fireEvent.changeText(passwordInput, "password");

    // Simulate pressing the login button
    fireEvent.press(loginButton);

    // Check if the axios POST request was made with correct data
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/login`,
      { username: "user", password: "password" },
      expect.any(Object)
    );
  });
});
