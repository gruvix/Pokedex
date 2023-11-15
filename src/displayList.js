export function addSprite(sprite, htmlItem) {
  if (!sprite) return;
  const img = $(`<img src="${sprite}" class="list-sprite">`);
  htmlItem.append(img);
}
export function removeLoadingFromListItem(element) {
  element.children('.lds-dual-ring').remove();
}
export function addLoadingToListItem(element) {
  const loading = $('<div class="lds-dual-ring"></div>');
  loading.addClass('lds-dual-ring');
  element.append(loading);
}
