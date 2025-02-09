import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { fetchReposFx } from '@/entities/repo/api';

vi.mock('@/entities/repo/api', () => ({
  fetchReposFx: vi.fn()
}));

const mockReposData = {
  edges: [
    {
      node: {
        id: '1',
        name: 'test-repo',
        stargazerCount: 100,
        updatedAt: '2024-03-25T12:00:00Z',
        url: 'https://github.com/test/test-repo',
        owner: { login: 'test' }
      },
      cursor: 'cursor1'
    }
  ],
  pageInfo: {
    endCursor: 'cursor1',
    hasNextPage: true
  },
  repositoryCount: 100
};

describe('HomePage', () => {
  beforeEach(() => {
    (fetchReposFx as jest.Mock).mockResolvedValue(mockReposData);
  });

  it('renders search input', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });
    expect(screen.getByPlaceholderText(/Search repositories/i)).toBeInTheDocument();
  });


  it('displays repositories after loading', async () => {
    const mockData = {
      edges: [{
        node: {
          id: '1',
          name: 'test-repo',
          stargazerCount: 100,
          updatedAt: '2024-03-25',
          owner: { login: 'test' },
          url: 'https://github.com/test/test-repo'
        }
      }],
      pageInfo: { endCursor: 'cursor1' },
      repositoryCount: 1
    };

    (fetchReposFx as jest.Mock).mockResolvedValue(mockData);

    await act(async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });

    expect(await screen.findByText(/test-repo/)).toBeInTheDocument();
  });

  it('handles search input change', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });

    const searchInput = screen.getByPlaceholderText(/Search repositories/i);
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'react' } });
    });

    expect(searchInput).toHaveValue('react');
  });
}); 