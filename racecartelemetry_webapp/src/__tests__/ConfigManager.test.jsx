import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConfigManager from "../components/ConfigManager";

jest.mock("@services/CANConfigurationService", () => ({
  fetchConfigs: jest.fn(),
  createConfig: jest.fn(),
  deleteConfig: jest.fn(),
}));

describe("ConfigManager Component", () => {
  const mockOnConfigSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Configuration Manager title", () => {
    render(<ConfigManager onConfigSelect={mockOnConfigSelect} />);
    expect(screen.getByText("Configuration Manager")).toBeInTheDocument();
  });

  test("displays error message when creating a config without a name", async () => {
    render(<ConfigManager onConfigSelect={mockOnConfigSelect} />);
    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);
    expect(screen.getByText("Config name is required.")).toBeInTheDocument();
  });

  test("calls onConfigSelect when a config is selected", async () => {
    const configs = [{ id: "1", name: "Config1" }];
    require("@services/CANConfigurationService").fetchConfigs.mockResolvedValue(
      configs
    );

    render(<ConfigManager onConfigSelect={mockOnConfigSelect} />);

    // Wait for the configs to load
    await waitFor(() => {
      const select = screen.getByRole("button", { name: /Select Config/i });
      fireEvent.mouseDown(select); // Opens the dropdown
      const menuItem = screen.getByText("Config1");
      fireEvent.click(menuItem); // Select the config

      expect(mockOnConfigSelect).toHaveBeenCalledWith("1");
    });
  });
});
