import { hideBackback } from '../backpack.js';
/// <reference types="Jest" />
describe('it should test the backpack', () => {
  it('it should hide the backpack', () => {
    document.body.innerHTML ='<div id="pokemon-backpack-modal"></div>';
    hideBackback();
    expect($('#pokemon-backpack-modal').not.toBeVisible());
  });
});
