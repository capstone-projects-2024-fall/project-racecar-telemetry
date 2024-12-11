// src/__tests__/ConfigManager.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import ConfigManager from "@components/ConfigManager";
import Navbar from "@components/NavBar";
import Home from "../app/page";
import DataGauge from "@components/DataGauge";

// Use case 1
describe("ConfigManager Component", () => {
  test("renders the title", () => {
    render(<ConfigManager onConfigSelect={jest.fn()} />);
    expect(screen.getByText("Configuration Manager")).toBeInTheDocument();
  });

  test("renders the configuration dropdown", () => {
    render(<ConfigManager onConfigSelect={jest.fn()} />);
    expect(screen.getByText("Select a Configuration")).toBeInTheDocument();
  });

  test("renders the new configuration input", () => {
    render(<ConfigManager onConfigSelect={jest.fn()} />);
    expect(screen.getByLabelText("New Configuration Name")).toBeInTheDocument();
  });

  test("renders the create button", () => {
    render(<ConfigManager onConfigSelect={jest.fn()} />);
    expect(screen.getByText("Create")).toBeInTheDocument();
  });
});

// Use case 2

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

jest.mock("@components/DataGauge", () => () => <div>DataGauge Component</div>);

test("renders DataGauge component on dashboard", () => {
  render(<Home />);

  // Expect the DataGauge component to be in the document
  const dataGauge = screen.getByText(/DataGauge Component/i);
  expect(dataGauge).toBeInTheDocument();
});

// Use Case 3

jest.mock("@mui/icons-material/Add", () => () => <div>Add Icon</div>);
jest.mock("@mui/icons-material/Remove", () => () => <div>Remove Icon</div>);
jest.mock("@mui/icons-material/CropDin", () => () => (
  <div>Increase Height Icon</div>
));
jest.mock("@mui/icons-material/Crop169", () => () => (
  <div>Decrease Height Icon</div>
));
jest.mock("@mui/icons-material/Crop169", () => () => (
  <div>Decrease Height Icon</div>
));
jest.mock("@mui/icons-material/Remove", () => () => (
  <div>Remove Component</div>
));

test("renders at least one Add Row button", () => {
  render(<Home />);

  const addRowButtons = screen.getAllByRole("button", { name: /Add Row/i });

  expect(addRowButtons.length).toBeGreaterThanOrEqual(1);
});

test("renders at least one Remove Row button", () => {
  render(<Home />);

  const removeRowButtons = screen.getAllByRole("button", {
    name: /Remove Row/i,
  });

  expect(removeRowButtons.length).toBeGreaterThanOrEqual(1);
});

test("renders at least one Increase Row Height button", () => {
  render(<Home />);

  const increaseHeightButtons = screen.getAllByRole("button", {
    name: /Increase Row Height/i,
  });

  expect(increaseHeightButtons.length).toBeGreaterThanOrEqual(1);
});

test("renders at least one Decrease Row Height button", () => {
  render(<Home />);

  const decreaseHeightButtons = screen.getAllByRole("button", {
    name: /Decrease Row Height/i,
  });

  expect(decreaseHeightButtons.length).toBeGreaterThanOrEqual(1);
});

// Use case 4

test("Graphs are able to be removed", () => {
  render(<Home />);

  const removeButtons = screen.getAllByRole("button", {
    name: /Remove Component/i,
  });

  expect(removeButtons.length).toBeGreaterThanOrEqual(1);
});

// Use case 5

test("Two users view at same time to see connected status", () => {
  useTelemetryConnectionStatus.mockReturnValue(true);
  render(<Navbar />);
  render(<Navbar />);

  const connectionStatus1 = screen.getAllByText(/telemetry connected/i);
  expect(connectionStatus1.length).toBeGreaterThanOrEqual(1);

  const connectionStatus2 = screen.getAllByText(/telemetry connected/i);
  expect(connectionStatus2.length).toBeGreaterThanOrEqual(1);
});
