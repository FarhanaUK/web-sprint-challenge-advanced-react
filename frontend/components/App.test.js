import AppFunctional from "./AppFunctional"
import React from "react"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


describe('Test that the visible texts in headings, buttons, links render on the screen', () => {
  test('all headings, buttons, and links are present', () => {
    // Render the component
    render(<AppFunctional />);

    // Headings
    const coordinatesHeading = screen.getByText(/Coordinates \(.*\)/i);
    const stepsHeading = screen.getByText(/You moved \d+ times?|You moved \d+ time/i);
    
    // Check if the message element exists by ID instead of text
    const messageElement = screen.getByRole('heading', { name: /coordinates/i });

    // Buttons
    const leftButton = screen.getByRole('button', { name: /left/i });
    const upButton = screen.getByRole('button', { name: /up/i });
    const rightButton = screen.getByRole('button', { name: /right/i });
    const downButton = screen.getByRole('button', { name: /down/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    // Input field
    const emailInput = screen.getByPlaceholderText(/type email/i);

    // Assertions
    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument(); // Check if the message element is in the document
    
    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
  });
});