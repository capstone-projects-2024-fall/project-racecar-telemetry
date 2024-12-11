import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import CANDataView from "../components/CANDataView";
import "@testing-library/jest-dom";
import { fetchCANData } from "@services/CANConfigurationService";

// Mock the fetchCANData service
jest.mock("@services/CANConfigurationService", () => ({
  fetchCANData: jest.fn(),
}));

describe("CANDataView Component", () => {
  const mockSetIsEditing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with a valid selectedConfig", () => {
    render(
      <CANDataView selectedConfig="TestConfig" setIsEditing={mockSetIsEditing} />
    );

    // Check the title displays the selected configuration
    const title = screen.getByText(/TestConfig/i);
    expect(title).toBeInTheDocument();

    // Check loading state
    expect(screen.getByText(/loading configuration data/i)).toBeInTheDocument();
  });

  

  test("displays fetched data correctly in modal", async () => {
    const mockData = {
      "250": {
        DataChannels: {
          throttle: { startBit: 0, bitLength: 8, adder: 0, multiplier: 1, unit: "%" },
          coolant: { startBit: 24, bitLength: 16, adder: 0, multiplier: 100, unit: "F" },
          battery: { startBit: 8, bitLength: 16, adder: 0, multiplier: 100, unit: "V" },
        },
      },
    };
  
    fetchCANData.mockResolvedValueOnce(mockData);
  
    render(
      <CANDataView selectedConfig="TestConfig" setIsEditing={jest.fn()} />
    );
  
    // Wait for "View signal info" button and click it
    const viewButton = await screen.findByText(/view signal info/i);
    fireEvent.click(viewButton);
  
    // Assert modal content
    await waitFor(() => {
      expect(screen.getByTestId("data-channel-throttle")).toHaveTextContent("throttle");
      expect(screen.getByTestId("start-bit-throttle")).toHaveTextContent("0");
      expect(screen.getByTestId("bit-length-throttle")).toHaveTextContent("8");
      expect(screen.getByTestId("adder-throttle")).toHaveTextContent("0");
      expect(screen.getByTestId("multiplier-throttle")).toHaveTextContent("1");
      expect(screen.getByTestId("unit-throttle")).toHaveTextContent("%");
    });
  });
  
});
