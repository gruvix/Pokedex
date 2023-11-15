function showError() {
  $('#error').removeClass('hidden');
}
export function handleError(message) {
  $('#error').html(message);
  showError();
}
export function hideError() {
  $('#error').addClass('hidden');
}
