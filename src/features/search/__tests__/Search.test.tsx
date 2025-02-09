import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Search from '../Search';

describe('Search Component', () => {
  it('renders the search input', () => {
    render(<Search searchQuery="" setSearchQuery={() => {}} />);
    expect(screen.getByPlaceholderText(/Search repositories/i)).toBeInTheDocument();
  });

  it('calls setSearchQuery on input change', async () => {
    const setSearchQueryMock = vi.fn();
    render(<Search searchQuery="" setSearchQuery={setSearchQueryMock} />);

    const inputElement = screen.getByPlaceholderText(/Search repositories/i);
    
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "react" } });
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    expect(setSearchQueryMock).toHaveBeenCalledWith("react");
  });
});
