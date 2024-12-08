import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar"; // Adjust the import path as needed
import telemetryConnectionStatus from "../hooks/telemetryConnectionStatus";

// Mock the telemetryConnectionStatus hook
jest.mock("../hooks/telemetryConnectionStatus", () => jest.fn());

describe("Navbar Component", () => {
  beforeEach(() => {
    telemetryConnectionStatus.mockReturnValue(true); // Default mock for telemetry status
  });

  it("renders the main title", () => {
    render(<Navbar />);
    const title = screen.getByText("Temple Formula Racing");
    expect(title).toBeInTheDocument();
  });

  it("shows telemetry status as 'Telemetry Connected' when connected", () => {
    telemetryConnectionStatus.mockReturnValue(true);
    render(<Navbar />);
    const status = screen.getByText("Telemetry Connected");
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle("color: #4caf50"); // Check green color
  });

  it("shows telemetry status as 'Telemetry Disconnected' when disconnected", () => {
    telemetryConnectionStatus.mockReturnValue(false);
    render(<Navbar />);
    const status = screen.getByText("Telemetry Disconnected");
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle("color: #f44336"); // Check red color
  });

  it("shows telemetry status as 'Checking connection...' when null", () => {
    telemetryConnectionStatus.mockReturnValue(null);
    render(<Navbar />);
    const status = screen.getByText("Checking connection...");
    expect(status).toBeInTheDocument();
  });

  it("renders the Dashboard button with correct text", () => {
    render(<Navbar />);
    const dashboardButton = screen.getByText("Dashboard");
    expect(dashboardButton).toBeInTheDocument();
  });

  it("renders the CAN Configuration button with correct text", () => {
    render(<Navbar />);
    const canConfigButton = screen.getByText("CAN Configuration");
    expect(canConfigButton).toBeInTheDocument();
  });

  it("renders the Custom Dash button with correct text", () => {
    render(<Navbar />);
    const customDashButton = screen.getByText("Custom Dash");
    expect(customDashButton).toBeInTheDocument();
  });
});
