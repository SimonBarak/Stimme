export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomGradient(): string {
  // Predefined list of colors
  const colors: string[] = [
    "#FFFF4B",
    "#FDFD7C",
    "#FFFFBB",
    "#FBFF90",
    // Add more colors as needed
  ];

  // Function to get a random color from the array
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  let color1 = "#FEFFF2";
  let color2 = getRandomColor();

  // Ensure that both colors are distinct
  // while (color1 === color2) {
  //   color2 = getRandomColor();
  // }

  // Return the gradient string
  return `linear-gradient(${getRandomNumber(0, 120)}deg, ${color1} ${
    getRandomNumber(0, 3) * 10
  }%, ${color2} ${getRandomNumber(7, 10) * 10}%)`;
}
