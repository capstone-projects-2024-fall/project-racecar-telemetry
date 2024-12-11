import { render, screen } from "@testing-library/react";
import Navbar from "../components/NavBar.jsx";
import "@testing-library/jest-dom"; // Ensure extended matchers like toBeInTheDocument are available

// Mock the `useTelemetryConnectionStatus` hook
jest.mock("@hooks/useTelemetryConnectionStatus", () => jest.fn());
import useTelemetryConnectionStatus from "@hooks/useTelemetryConnectionStatus";

// Mock Next.js `Link` component
jest.mock("next/link", () => {
  return ({ children }) => children;
});

beforeEach(() => {
  useTelemetryConnectionStatus.mockReturnValue(null); // Default: Connection checking
});

test("Navbar renders successfully", () => {
  render(<Navbar />);

  // Assert the title is rendered
  const dashboardButton = screen.getByText(/dashboard/i);
  const canConfigButton = screen.getByText(/CAN Configuration/i);
  const titleElement = screen.getByText(/temple formula racing/i);
  expect(titleElement).toBeInTheDocument();
  expect(dashboardButton).toBeInTheDocument();
  expect(canConfigButton).toBeInTheDocument();


});

test("Displays 'Checking connection...' when isConnected is null", () => {
  useTelemetryConnectionStatus.mockReturnValue(null);
  render(<Navbar />);

  const connectionStatus = screen.getByText(/checking connection.../i);
  expect(connectionStatus).toBeInTheDocument();
});

test("Displays 'Telemetry Connected' when isConnected is true", () => {
  useTelemetryConnectionStatus.mockReturnValue(true);
  render(<Navbar />);

  const connectionStatus = screen.getByText(/telemetry connected/i);
  expect(connectionStatus).toBeInTheDocument();
});

test("Displays 'Telemetry Disconnected' when isConnected is false", () => {
  useTelemetryConnectionStatus.mockReturnValue(false);
  render(<Navbar />);

  const connectionStatus = screen.getByText(/telemetry disconnected/i);
  expect(connectionStatus).toBeInTheDocument();
});
