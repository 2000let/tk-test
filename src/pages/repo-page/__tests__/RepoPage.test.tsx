import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepoPage from '../RepoPage';
import { fetchRepoDetailsFx } from '@/entities/repo/api';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      name: 'test-repo',
      owner: 'test-owner'
    })
  };
});

vi.mock('@/entities/repo/api', () => ({
  fetchRepoDetailsFx: vi.fn()
}));

const mockRepoData = {
  name: 'test-repo',
  stargazerCount: 100,
  updatedAt: '2024-03-25T12:00:00Z',
  url: 'https://github.com/test/test-repo',
  owner: {
    avatarUrl: 'https://avatar.url',
    login: 'test-owner',
    url: 'https://github.com/test-owner'
  },
  languages: {
    edges: [
      { node: { name: 'TypeScript' } },
      { node: { name: 'JavaScript' } }
    ]
  },
  description: 'Test repository description'
};

describe('RepoPage', () => {
  beforeEach(() => {
    (fetchRepoDetailsFx as jest.Mock).mockResolvedValue(mockRepoData);
  });

  it('shows loading state initially', () => {
    render(
      <BrowserRouter>
        <RepoPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays repository details after loading', async () => {
    render(
      <BrowserRouter>
        <RepoPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
      expect(screen.getByText('test-owner')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Test repository description')).toBeInTheDocument();
    });
  });

  it('displays back button', async () => {
    render(
      <BrowserRouter>
        <RepoPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('← Назад')).toBeInTheDocument();
    });
  });
}); 