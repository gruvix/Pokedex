import { hasIndexFreeSlot } from '../backpack.js';
/// <reference types="Jest" />
describe('backpack', () => {
  it('should test backpack', () => {
    expect(hasIndexFreeSlot([1, 2, 3, 4, 5, 6])).toBe(false);
  });
});
