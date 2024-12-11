import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CANInput from "../components/CANInput";
import '@testing-library/jest-dom';


describe("CANInput Component", () => {
  const mockOnRowChange = jest.fn();
  const mockRow = { CanID: "", NumOfSignals: "1", Signals: [] };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders CANID and # of Signals input fields", () => {
    render(<CANInput row={mockRow} onRowChange={mockOnRowChange} />);

    expect(screen.getByLabelText("CANID")).toBeInTheDocument();
    expect(screen.getByLabelText("# of Signals")).toBeInTheDocument();
  });

  test("calls onRowChange when CANID changes", () => {
    render(<CANInput row={mockRow} onRowChange={mockOnRowChange} />);

    const canIDField = screen.getByLabelText("CANID");
    fireEvent.change(canIDField, { target: { value: "123" } });

    expect(mockOnRowChange).toHaveBeenCalledWith({ ...mockRow, CanID: "123" });
  });

  test("opens and closes the modal", () => {
    render(<CANInput row={mockRow} onRowChange={mockOnRowChange} />);

    fireEvent.click(screen.getByText(/edit signal info/i));
    expect(screen.getByText("Edit Signal Info")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Save Changes"));
    expect(screen.queryByText("Edit Signal Info")).not.toBeInTheDocument();
  });
});