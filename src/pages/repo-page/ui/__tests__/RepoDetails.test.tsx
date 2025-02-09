import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepoDetails from '../RepoDetails';

const mockRepo = {
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

describe('RepoDetails', () => {
  it('renders repository information correctly', () => {
    render(
      <BrowserRouter>
        <RepoDetails repo={mockRepo} />
      </BrowserRouter>
    );

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('test-owner')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Test repository description')).toBeInTheDocument();
  });

  it('renders owner avatar', () => {
    render(
      <BrowserRouter>
        <RepoDetails repo={mockRepo} />
      </BrowserRouter>
    );

    const avatar = screen.getByRole('img', { name: "test-owner's avatar" });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://avatar.url');
  });

  it('renders back button', () => {
    render(
      <BrowserRouter>
        <RepoDetails repo={mockRepo} />
      </BrowserRouter>
    );

    expect(screen.getByText('← Назад')).toBeInTheDocument();
  });
}); 