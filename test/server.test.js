import { describe, it, expect } from 'vitest';
import { server } from '../src/index.js';

describe('Server tests', () => {
  it('should import server correctly', () => {
    expect(server).toBeDefined();
  });

  // Add your actual tests here
});