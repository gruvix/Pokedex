function addImageToCarousel(imageSource) {
  const img = document.createElement('img');
  img.src = imageSource;
  const div = document.createElement('div');
  div.appendChild(img);
  const carousel = document.querySelector('#pokemon-carousel .carousel-inner');
  carousel.appendChild(div);
  div.classList.add('carousel-item');
  if (carousel.children.length === 1) {
    div.classList.add('active');
  }
}
export default function displayPokemon(sprites) {
  sprites.forEach((sprite) => {
    addImageToCarousel(sprite);
  });
}
