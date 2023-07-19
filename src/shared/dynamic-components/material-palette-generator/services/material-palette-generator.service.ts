import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaterialPaletteGeneratorService {
  constructor() {}

  /**
   * Envia la paleta de colores a nuestra hoja de estilos.
   * @param _palette - Array.
   * @param prefix - String.
   * @param contrast - Boolean.
   * @param opacity - Boolean.
   */
  public setCssVars(
    _palette: any[],
    prefix: string,
    contrast: boolean,
    opacity?: boolean
  ): void {
    const root: any = document.querySelector(':root');
    let darkness = 0;
    _palette.forEach((_palette, index) => {
      if (index == 0) {
        darkness = 50;
      } else if (index == 1) {
        darkness = 100;
      } else {
        darkness += 100;
      }
      if (!opacity) {
        root?.style.setProperty(
          `--${prefix}-${contrast ? 'contrast-' + darkness : darkness}`,
          contrast ? _palette.contrast : _palette.color
        );
      } else {
        root?.style.setProperty(
          `--${prefix}-opacity-${darkness}`,
          contrast ? _palette.contrast : _palette.color
        );
      }
    });
  }

  public getImagePalette() {
    const imgFile: any = document.getElementById('imageBackground');

    if (imgFile) {
      fetch(imgFile?.src || '')
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'palette.png', blob);
          console.log(file);
          const image = new Image();
          const fileReader = new FileReader();

          const canvas = document.createElement('canvas');
          canvas.width = imgFile.width;
          canvas.height = imgFile.height;
          const ctx = canvas.getContext('2d');
          // ctx?.drawImage(imgFile, 0, 0);
          ctx?.drawImage(imgFile, 0, 0, 500, 500);

          const imageData = ctx?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          console.log(imageData);

          // Convert the image data to RGB values so its much simpler
          const rgbArray = buildRgb(imageData?.data || []);

          /**
           * Color quantization
           * A process that reduces the number of colors used in an image
           * while trying to visually maintin the original image as much as possible
           */
          const quantColors = quantization(rgbArray, 0);

          // Create the HTML structure to show the color palette
          buildPalette(quantColors);
          canvas.remove();
        });
    }
  }
}

const buildPalette = (colorsList: any) => {
  const paletteContainer = document.getElementById('palette');
  const complementaryContainer = document.getElementById('complementary');
  // reset the HTML in case you load various images
  if (paletteContainer && complementaryContainer) {
    paletteContainer.innerHTML = '';
    complementaryContainer.innerHTML = '';
  }

  const orderedByColor = orderByLuminance(colorsList);
  // const hslColors = convertRGBtoHSL(orderedByColor);

  for (let i = 0; i < orderedByColor.length; i++) {
    const difference = calculateColorDifference(
      orderedByColor[i],
      i === 0 ? { r: 255, g: 255, b: 255 } : orderedByColor[i - 1]
    );

    // if the distance is less than 120 we ommit that color
    if (
      difference < 120 ||
      (orderedByColor.length > 5 && i === 0) ||
      (orderedByColor.length > 5 && i === orderedByColor.length - 1)
    ) {
      continue;
    }

    let primary = rgbToHex(orderedByColor[i]);
    let secundary = changeHue(primary, 20);
    let tertiary = changeHue(primary, 40);

    if (primary === secundary) {
      secundary = increase_brightness(secundary, 0.08);
    } else {
      secundary = increase_brightness(secundary, 0.08);
    }
    if (primary === tertiary) {
      tertiary = increase_brightness(tertiary, 0.08);
    } else {
      secundary = increase_brightness(secundary, 0.08);
    }

    const primaryBrightness = brightnessByColor(primary);
    const secundaryBrightness = brightnessByColor(secundary);
    const tertiaryBrightness = brightnessByColor(tertiary);

    if (Number(primaryBrightness) <= 50) {
      primary = increase_brightness(primary, 0.1);
    }

    if (Number(secundaryBrightness) <= 50) {
      secundary = increase_brightness(secundary, 0.1);
    }

    if (Number(tertiaryBrightness) <= 50) {
      tertiary = increase_brightness(tertiary, 0.1);
    }

    // if (Number(primaryBrightness) > 50) {
    //   primary = increase_brightness(primary, -0.2);
    // }

    // if (Number(secundaryBrightness) > 50) {
    //   secundary = increase_brightness(secundary, -0.2);
    // }

    // if (Number(tertiaryBrightness) > 50) {
    //   tertiary = increase_brightness(tertiary, -0.2);
    // }

    const primaryOpacity = cambiarOpacidad(primary, 0.2);
    const secundaryOpacity = cambiarOpacidad(secundary, 0.2);
    const tertiaryOpacity = cambiarOpacidad(tertiary, 0.2);

    console.log(primary, secundary, tertiary);

    document.body.style.background = 'black';

    const colorElement = document.createElement('div');
    colorElement.style.backgroundColor = primaryOpacity;
    colorElement.style.color = secundaryOpacity;
    colorElement.style.border = 'solid 10px ' + tertiaryOpacity;
    colorElement.appendChild(document.createTextNode(primary));
    paletteContainer?.appendChild(colorElement);
  }
};

// Función para cambiar la opacidad de un color hexadecimal
const cambiarOpacidad = (colorHex: any, opacidad: number) => {
  // Remover el símbolo '#' del color hexadecimal
  colorHex = colorHex.replace('#', '');

  // Obtener los valores RGB del color hexadecimal
  let r = parseInt(colorHex.substr(0, 2), 16);
  let g = parseInt(colorHex.substr(2, 2), 16);
  let b = parseInt(colorHex.substr(4, 2), 16);

  // Calcular el valor de alfa (opacidad)
  let alfa = opacidad.toFixed(2); // Ajustar la opacidad a dos decimales

  // Devolver el color en formato RGBA
  return `rgba(${r}, ${g}, ${b}, ${alfa})`;
};

/**
 * Calculate brightness value by RGB or HEX color.
 * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
 * @returns (Number) The brightness value (dark) 0 ... 255 (light)
 */
const brightnessByColor = (colorHex: any) => {
  // Convertir el color hexadecimal a HSL
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
  let r = parseInt(rgb ? rgb[1] : '0', 16);
  let g = parseInt(rgb ? rgb[1] : '0', 16);
  let b = parseInt(rgb ? rgb[1] : '0', 16);

  // Convertir a valores en el modelo HSL
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let l = (max + min) / 2;

  // Calcular el porcentaje de brillo
  let porcentajeBrillo = Math.round(l * 100);

  return porcentajeBrillo;
};

const increase_brightness = (colorHex: any, percent: number) => {
  // Convertir el color hexadecimal a HSL
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);

  let r = parseInt(rgb ? rgb[1] : '0', 16);
  let g = parseInt(rgb ? rgb[2] : '0', 16);
  let b = parseInt(rgb ? rgb[3] : '0', 16);

  // Convertir a valores en el modelo HSL
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Gris
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // Modificar el brillo
  l += percent;

  if (l > 1) {
    l = 1;
  } else if (l < 0) {
    l = 0;
  }

  // Convertir de vuelta a RGB
  let m1, m2;

  if (s === 0) {
    r = g = b = l;
  } else {
    m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    m1 = l * 2 - m2;

    function hueToRgb(p: any, q: any, t: any) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    r = hueToRgb(m1, m2, h + 1 / 3);
    g = hueToRgb(m1, m2, h);
    b = hueToRgb(m1, m2, h - 1 / 3);
  }

  // Convertir de vuelta a hexadecimal
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  let resultHex = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return resultHex;
};
//  Convert each pixel value ( number ) to hexadecimal ( string ) with base 16
const rgbToHex = (pixel: any) => {
  const componentToHex = (c: any) => {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  return (
    '#' +
    componentToHex(pixel.r) +
    componentToHex(pixel.g) +
    componentToHex(pixel.b)
  ).toUpperCase();
};

/**
 * Convert HSL to Hex
 * this entire formula can be found in stackoverflow, credits to @icl7126 !!!
 * https://stackoverflow.com/a/44134328/17150245
 */
const hslToHex = (hslColor: any) => {
  const hslColorCopy = { ...hslColor };
  hslColorCopy.l /= 100;
  const a =
    (hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100;
  const f = (n: any) => {
    const k = (n + hslColorCopy.h / 30) % 12;
    const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

/**
 * Using relative luminance we order the brightness of the colors
 * the fixed values and further explanation about this topic
 * can be found here -> https://en.wikipedia.org/wiki/Luma_(video)
 */
const orderByLuminance = (rgbValues: any) => {
  const calculateLuminance = (p: any) => {
    return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
  };

  return rgbValues.sort((p1: any, p2: any) => {
    return calculateLuminance(p2) - calculateLuminance(p1);
  });
};

const buildRgb = (imageData: any) => {
  const rgbValues = [];
  // note that we are loopin every 4!
  // for every Red, Green, Blue and Alpha
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    };

    rgbValues.push(rgb);
  }

  return rgbValues;
};

/**
 * Calculate the color distance or difference between 2 colors
 *
 * further explanation of this topic
 * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
 * note: this method is not accuarate for better results use Delta-E distance metric.
 */
const calculateColorDifference = (color1: any, color2: any) => {
  const rDifference = Math.pow(color2.r - color1.r, 2);
  const gDifference = Math.pow(color2.g - color1.g, 2);
  const bDifference = Math.pow(color2.b - color1.b, 2);

  return rDifference + gDifference + bDifference;
};

// returns what color channel has the biggest difference
const findBiggestColorRange = (rgbValues: any) => {
  /**
   * Min is initialized to the maximum value posible
   * from there we procced to find the minimum value for that color channel
   *
   * Max is initialized to the minimum value posible
   * from there we procced to fin the maximum value for that color channel
   */
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel: any) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return 'r';
  } else if (biggestRange === gRange) {
    return 'g';
  } else {
    return 'b';
  }
};

/**
 * Median cut implementation
 * can be found here -> https://en.wikipedia.org/wiki/Median_cut
 */
const quantization = (rgbValues: any, depth: any): any => {
  const MAX_DEPTH = 4;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev: any, curr: any) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1: any, p2: any) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value
// and changes it back to RGB/HEX.

const changeHue = (rgb: any, degree: any) => {
  var hsl = rgbToHSL(rgb);
  hsl.h += degree;
  if (hsl.h > 360) {
    hsl.h -= 360;
  } else if (hsl.h < 0) {
    hsl.h += 360;
  }
  return hslToRGB(hsl);
};

// exepcts a string and returns an object
const rgbToHSL = (rgb: any) => {
  // strip the leading # if it's there
  rgb = rgb.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (rgb.length == 3) {
    rgb = rgb.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(rgb.substr(0, 2), 16) / 255,
    g = parseInt(rgb.substr(2, 2), 16) / 255,
    b = parseInt(rgb.substr(4, 2), 16) / 255,
    cMax = Math.max(r, g, b),
    cMin = Math.min(r, g, b),
    delta = cMax - cMin,
    l = (cMax + cMin) / 2,
    h = 0,
    s = 0;

  if (delta == 0) {
    h = 0;
  } else if (cMax == r) {
    h = 60 * (((g - b) / delta) % 6);
  } else if (cMax == g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }

  if (delta == 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return {
    h: h,
    s: s,
    l: l,
  };
};

// expects an object and returns a string
const hslToRGB = (hsl: any) => {
  var h = hsl.h,
    s = hsl.s,
    l = hsl.l,
    c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r,
    g,
    b;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = normalize_rgb_value(r, m);
  g = normalize_rgb_value(g, m);
  b = normalize_rgb_value(b, m);

  return rgbToHex({ r, g, b });
};

const normalize_rgb_value = (color: any, m: any) => {
  color = Math.floor((color + m) * 255);
  if (color < 0) {
    color = 0;
  }
  return color;
};
