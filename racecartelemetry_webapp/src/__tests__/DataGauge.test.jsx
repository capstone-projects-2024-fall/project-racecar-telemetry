// import { render, screen, waitFor } from "@testing-library/react";
// import DataGauge from "@/components/DataGauge";
// import {
//   fetchUnit,
//   getCurrentConfig,
// } from "@/services/CANConfigurationService";
// import { db } from "@firebaseConfig";
// import { ref, onValue } from "firebase/database";
// import dynamic from "next/dynamic";

// // Mock necessary dependencies
// jest.mock("@firebaseConfig", () => ({
//   db: jest.fn(),
// }));
// jest.mock("@services/CANConfigurationService", () => ({
//   fetchUnit: jest.fn(),
//   getCurrentConfig: jest.fn(),
// }));
// jest.mock("firebase/database", () => ({
//   ref: jest.fn(),
//   onValue: jest.fn(),
// }));

// // Mock dynamic import of Plot
// jest.mock("react-plotly.js", () => () => <div data-testid="plot"></div>);

// describe("DataGauge Component", () => {
//   const uniqueID = "gauge-1";

//   beforeEach(() => {
//     // Mocking values for services
//     fetchUnit.mockResolvedValue("unit-1");
//     getCurrentConfig.mockResolvedValue({
//       canID: "CAN1",
//       dataChannel: "channel1",
//     });

//     // Mocking Firebase Realtime Database
//     const mockUnsubscribe = jest.fn();
//     onValue.mockImplementation((ref, callback) => {
//       callback({
//         exists: () => true,
//         val: () => ({ channel1: 50 }),
//       });
//       return mockUnsubscribe;
//     });
//   });

//   test("renders the DataGauge component", async () => {
//     render(<DataGauge uniqueID={uniqueID} />);

//     // Check if the canID and dataChannel are rendered correctly
//     expect(screen.getByText("CAN ID / Data Channel")).toBeInTheDocument();

//     // Check if Plot component is rendered
//     const plot = screen.getByTestId("plot");
//     expect(plot).toBeInTheDocument();
//   });

//   test("fetches and displays the unit correctly", async () => {
//     render(<DataGauge uniqueID={uniqueID} />);

//     // Wait for the unit to be fetched and displayed
//     await waitFor(() => expect(fetchUnit).toHaveBeenCalledTimes(1));

//     // Check if the unit "unit-1" is displayed
//     expect(screen.getByText("unit-1")).toBeInTheDocument();
//   });

//   test("shows metric value fetched from Firebase", async () => {
//     render(<DataGauge uniqueID={uniqueID} />);

//     // Wait for Firebase data to be fetched and displayed
//     await waitFor(() => expect(onValue).toHaveBeenCalledTimes(1));

//     // Check if the value from Firebase (50) is displayed
//     expect(screen.getByText("50")).toBeInTheDocument();
//   });

//   test("handles empty unit gracefully", async () => {
//     fetchUnit.mockResolvedValueOnce(""); // Simulate empty unit

//     render(<DataGauge uniqueID={uniqueID} />);

//     // Wait for the unit to be fetched
//     await waitFor(() => expect(fetchUnit).toHaveBeenCalledTimes(1));

//     // Check if the "Unknown" unit is displayed
//     expect(screen.getByText("Unknown")).toBeInTheDocument();
//   });

//   test("handles error fetching unit", async () => {
//     fetchUnit.mockRejectedValueOnce(new Error("Error Fetching Unit"));

//     render(<DataGauge uniqueID={uniqueID} />);

//     // Wait for the error to be handled and unit set to "Error"
//     await waitFor(() => expect(fetchUnit).toHaveBeenCalledTimes(1));

//     // Check if the error message is displayed
//     expect(screen.getByText("Error")).toBeInTheDocument();
//   });
// });
