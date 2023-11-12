export function easterEgg() {
  const michelin = {
    name: 'michelin',
    types: [
      {
        type: {
          name: 'normal',
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: 'strong wheels',
        },
      },
    ],
    moves: [
      {
        move: {
          name: 'change wheel',
        },
      },
      {
        move: {
          name: 'wheel slide',
        },
      },
    ],
    sprites: {
      other: {
        michelinWorld: {
          michelin1: 'img/michelin1.jpeg',
          michelin2: 'img/michelin2.jpeg',
          michelin3: 'img/michelin3.jpeg',
        },
      },
    },
  };
  return michelin;
}
