import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CANDataAssignment from "../components/CANDataAssignment";
import { fetchCANData, saveCANData, deleteConfigRow } from "@services/CANConfigurationService";

// Mock services
jest.mock("@services/CANConfigurationService", () => ({
  fetchCANData: jest.fn(),
  saveCANData: jest.fn(),
  deleteConfigRow: jest.fn(),
}));

describe("CANDataAssignment Component", () => {
  const mockSetIsEditing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders a message when no configuration is selected", () => {
    render(<CANDataAssignment selectedConfig={null} setIsEditing={mockSetIsEditing} />);
    expect(screen.getByText(/please select a configuration to edit/i)).toBeInTheDocument();
  });

  test("renders a loading message while fetching data", () => {
    fetchCANData.mockImplementation(() => new Promise(() => {}));
    render(<CANDataAssignment selectedConfig="testConfig" setIsEditing={mockSetIsEditing} />);
    expect(screen.getByText(/loading configuration data/i)).toBeInTheDocument();
  });

  test("displays error when data fetching fails", async () => {
    fetchCANData.mockRejectedValueOnce(new Error("Failed to fetch data"));
    render(<CANDataAssignment selectedConfig="testConfig" setIsEditing={mockSetIsEditing} />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load existing data/i)).toBeInTheDocument();
    });
  });


  

  

  
  
});
