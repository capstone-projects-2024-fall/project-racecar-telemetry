import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComponentEditor from "@components/ComponentEditor";

describe("ComponentEditor", () => {
  const groupedDataChannelsMock = {
    can1: ["Channel1", "Channel2"],
    can2: ["ChannelA", "ChannelB"],
  };

  it("renders with title 'Component Editor'", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    expect(screen.getByText("Component Editor")).toBeInTheDocument();
  });

  it("displays 'Component Type' dropdown", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    expect(screen.getByLabelText("Component Type")).toBeInTheDocument();
  });

  it("shows correct 'Component Type' options", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    fireEvent.mouseDown(screen.getByLabelText("Component Type"));
    ["Gauge", "Linear Gauge", "Time Series Graph", "XY Graph"].forEach(
      (option) => {
        expect(screen.getByText(option)).toBeInTheDocument();
      }
    );
  });

  it("shows dynamic fields when 'Component Type' is selected", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );

    // Open the dropdown (assuming it's a button or custom select)
    fireEvent.mouseDown(screen.getByLabelText("Component Type"));

    // Select the 'Gauge' option
    fireEvent.click(screen.getByText("Gauge"));

    // Check for dynamic fields
    ["Color", "Min Value", "Max Value"].forEach((field) => {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    });
  });

  it("shows CAN ID and Data Channel for non-XY Graph", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );

    // Open the dropdown (assuming it's a button or custom select)
    fireEvent.mouseDown(screen.getByLabelText("Component Type"));

    // Select the 'Gauge' option
    fireEvent.click(screen.getByText("Gauge"));

    // Check for 'CAN ID' and 'Data Channel' fields
    expect(screen.getByLabelText("CAN ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Channel")).toBeInTheDocument();
  });

  it("shows X and Y axis for 'XY Graph'", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    fireEvent.change(screen.getByLabelText("Component Type"), {
      target: { value: "XY Graph" },
    });
    [
      "X-Axis CAN ID",
      "X-Axis Data Channel",
      "Y-Axis CAN ID",
      "Y-Axis Data Channel",
    ].forEach((field) => {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    });
  });

  it("calls onCancel when 'Cancel' is clicked", () => {
    const onCancelMock = jest.fn();
    render(
      <ComponentEditor
        open={true}
        onCancel={onCancelMock}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancelMock).toHaveBeenCalled();
  });

  it("shows validation errors on 'Save' with empty fields", () => {
    render(
      <ComponentEditor
        open={true}
        groupedDataChannels={groupedDataChannelsMock}
      />
    );
    fireEvent.click(screen.getByText("Save"));
    expect(
      screen.getByText("Please select a component type.")
    ).toBeInTheDocument();
  });
});
