import { render, screen, fireEvent, act } from "@testing-library/react";
import ConfigManager from "../components/ConfigManager";
import "@testing-library/jest-dom";

jest.mock("@services/CANConfigurationService", () => ({
  fetchConfigs: jest.fn(() => Promise.resolve([])),
  createConfig: jest.fn(() => Promise.resolve({ id: "NewConfig" })),
  deleteConfig: jest.fn(() => Promise.resolve()),
}));

describe("ConfigManager Component", () => {
  const mockOnConfigSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component and displays 'Select a Configuration' when no config is selected", () => {
    render(<ConfigManager onConfigSelect={mockOnConfigSelect} />);

    // Verify the Select component displays 'Select a Configuration' using its role
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent("Select a Configuration");
  });

  

  test("selects a configuration and triggers onConfigSelect callback", async () => {
    const mockConfigs = [{ id: "Config1" }, { id: "Config2" }];
    jest.spyOn(require("@services/CANConfigurationService"), "fetchConfigs").mockResolvedValueOnce(mockConfigs);

    render(<ConfigManager onConfigSelect={mockOnConfigSelect} />);

    // Open the dropdown and select a configuration
    const dropdown = screen.getByRole("combobox");
    fireEvent.mouseDown(dropdown);
    const option = await screen.findByText("Config1");
    fireEvent.click(option);

    // Verify callback is triggered
    expect(mockOnConfigSelect).toHaveBeenCalledWith("Config1");
  });

  
});
