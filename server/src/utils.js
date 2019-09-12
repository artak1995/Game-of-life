const hexToDecimal = (hex) => {
  const decimal = parseInt(`0x${hex}`);
  return decimal;
}

export const averageColor = (color1, color2) => {
  color1 = color1.substr(1);
  color2 = color2.substr(1);
  const rgbR = Math.floor(((hexToDecimal(`${color1[0]}${color1[1]}`) + hexToDecimal(`${color2[0]}${color2[1]}`)) / 2)).toString(16).padStart(2, 0);
  const rgbG = Math.floor(((hexToDecimal(`${color1[2]}${color1[3]}`) + hexToDecimal(`${color2[2]}${color2[3]}`)) / 2)).toString(16).padStart(2, 0);
  const rgbB = Math.floor(((hexToDecimal(`${color1[4]}${color1[5]}`) + hexToDecimal(`${color2[4]}${color2[5]}`)) / 2)).toString(16).padStart(2, 0);
  const newColor = `#${rgbR}${rgbG}${rgbB}`;
  return newColor;
}

const generateRandomHexCode = () => {
  const hexCode = Math.floor(Math.random() * 255).toString(16);
  return hexCode;
}

export const generateRandomColor = (colors) => {
  const randomColorR = generateRandomHexCode().padStart(2, 0);
  const randomColorG = generateRandomHexCode().padStart(2, 0);
  const randomColorB = generateRandomHexCode().padStart(2, 0);
  const randomColor = `${randomColorR}${randomColorG}${randomColorB}`;
  if (colors.includes(randomColor)) {
    return generateRandomColor(colors);
  }
  return `#${randomColor}`;
}