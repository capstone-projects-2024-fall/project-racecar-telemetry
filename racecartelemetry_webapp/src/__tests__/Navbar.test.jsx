import { render, screen } from '@testing-library/react';
import Navbar from "../components/Navbar";

test("Navbar renders successfully", () => {
    render(<Navbar/>);

    const element = screen.getByText(/temple formula racing/i);

    expect(element).toBeInTheDocument();
})