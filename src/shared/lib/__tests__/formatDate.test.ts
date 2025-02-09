import { describe, it, expect } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = '2024-03-25T12:00:00Z';
    const formatted = formatDate(date);
    
    expect(formatted).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
  });

  it('handles different timezone correctly', () => {
    const date = '2024-03-25T00:00:00Z';
    const formatted = formatDate(date);
    
    expect(formatted).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
  });
}); 