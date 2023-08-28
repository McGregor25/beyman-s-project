import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationTheme } from 'src/app/models/app-root.model';

import {
  Hct,
  applyTheme,
  themeFromImage,
  hexFromArgb,
  MaterialDynamicColors,
  Scheme,
} from '@material/material-color-utilities';

/**
 *INTERFAZ DE COLORES RGB.
 */
export interface RGB {
  /**
   *BLUE.
   */
  b: number;
  /**
   *GREEN.
   */
  g: number;
  /**
   *RED.
   */
  r: number;
}
export let _background: string = 'red';

@Injectable({
  providedIn: 'root',
})
export class MaterialPaletteGeneratorService {
  /**
   * Variables de temas.
   */
  public themeCssVariables: string[] = [
    'primary',
    'secondary',
    'accent',
    'warn',
    '--primary-contrast-900',
    '--secundary-contrast-900',
    '--accent-contrast-900',
    '--warn-contrast-900',
  ];

  constructor(private store: Store) {}

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

  /**
   * Envia la variable css.
   * @param name - String.
   * @param color - String.
   */
  public setCssVar(name: string, color: string): void {
    const root: any = document.querySelector(':root');
    root?.style.setProperty(`--${name}`, color);
  }

  public getImagePalette() {
    const imgFile: any = document.getElementById('imageBackground');

    let systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // let systemDark = false;

    getImageBase64(imgFile?.src || '')
      .then((base64String) => {
        console.log('Imagen en base64:', base64String);

        themeFromImage(imgFile).then((theme) => {
          if (systemDark) {
            document.body.classList.add('dark');
          }
          console.log(theme);

          // const argbPrimary = theme.palettes.primary.keyColor.toInt();
          // const primary = hexFromArgb(argbPrimary);
          // console.log(primary);

          // const argbSecundary = theme.palettes.secondary.keyColor.toInt();
          // const secondary = hexFromArgb(argbSecundary);
          // console.log(secondary);

          // const argbTertiary = theme.palettes.tertiary.keyColor.toInt();
          // const tertiary = hexFromArgb(argbTertiary);
          // console.log(tertiary);

          // const argbWarn = theme.palettes.error.keyColor.toInt();
          // const error = hexFromArgb(argbWarn);
          // console.log(error);

          const scheme: Scheme = systemDark
            ? theme.schemes.dark
            : theme.schemes.light;

          const primary = hexFromArgb(scheme.primary);
          const onPrimary = hexFromArgb(scheme.onPrimary);
          const primaryContainer = hexFromArgb(scheme.primaryContainer);
          const onPrimaryContainer = hexFromArgb(scheme.onPrimaryContainer);
          const secondary = hexFromArgb(scheme.secondary);
          const onSecondary = hexFromArgb(scheme.onSecondary);
          const secondaryContainer = hexFromArgb(scheme.secondaryContainer);
          const onSecondaryContainer = hexFromArgb(scheme.onSecondaryContainer);
          const tertiary = hexFromArgb(scheme.tertiary);
          const onTertiary = hexFromArgb(scheme.onTertiary);
          const tertiaryContainer = hexFromArgb(scheme.tertiaryContainer);
          const onTertiaryContainer = hexFromArgb(scheme.onTertiaryContainer);
          const error = hexFromArgb(scheme.error);
          const onError = hexFromArgb(scheme.onError);
          const errorContainer = hexFromArgb(scheme.errorContainer);
          const onErrorContainer = hexFromArgb(scheme.onErrorContainer);
          const background = hexFromArgb(scheme.background);
          const onBackground = hexFromArgb(scheme.onBackground);
          const surface = hexFromArgb(scheme.surface);
          const onSurface = hexFromArgb(scheme.onSurface);
          const surfaceVariant = hexFromArgb(scheme.surfaceVariant);
          const onSurfaceVariant = hexFromArgb(scheme.onSurfaceVariant);
          const outline = hexFromArgb(scheme.outline);
          const outlineVariant = hexFromArgb(scheme.outlineVariant);
          const shadow = hexFromArgb(scheme.shadow);
          const scrim = hexFromArgb(scheme.scrim);
          const inverseSurface = hexFromArgb(scheme.inverseSurface);
          const inverseOnSurface = hexFromArgb(scheme.inverseOnSurface);
          const inversePrimary = hexFromArgb(scheme.inversePrimary);

          this.setCssVar('primary', primary);
          this.setCssVar('onPrimary', onPrimary);
          this.setCssVar('primaryContainer', primaryContainer);
          this.setCssVar('onPrimaryContainer', onPrimaryContainer);
          this.setCssVar('secondary', secondary);
          this.setCssVar('onSecondary', onSecondary);
          this.setCssVar('secondaryContainer', secondaryContainer);
          this.setCssVar('onSecondaryContainer', onSecondaryContainer);
          this.setCssVar('tertiary', tertiary);
          this.setCssVar('onTertiary', onTertiary);
          this.setCssVar('tertiaryContainer', tertiaryContainer);
          this.setCssVar('onTertiaryContainer', onTertiaryContainer);
          this.setCssVar('error', error);
          this.setCssVar('onError', onError);
          this.setCssVar('errorContainer', errorContainer);
          this.setCssVar('onErrorContainer', onErrorContainer);
          this.setCssVar('background', background);
          this.setCssVar('onBackground', onBackground);
          this.setCssVar('surface', surface);
          this.setCssVar('onSurface', onSurface);
          this.setCssVar('surfaceVariant', surfaceVariant);
          this.setCssVar('onSurfaceVariant', onSurfaceVariant);
          this.setCssVar('outline', outline);
          this.setCssVar('outlineVariant', outlineVariant);
          this.setCssVar('shadow', shadow);
          this.setCssVar('scrim', scrim);
          this.setCssVar('inverseSurface', inverseSurface);
          this.setCssVar('inverseOnSurface', inverseOnSurface);
          this.setCssVar('inversePrimary', inversePrimary);

          _background = background;
          // Print out the theme as JSON
          console.log(JSON.stringify(theme, null, 2));

          // Apply the theme to the body by updating custom properties for material tokens
          applyTheme(theme, { target: document.body, dark: systemDark});

          this.generatePalette(
            primary,
            this.themeCssVariables[0],
            10,
            onPrimary,
            systemDark
          );
          this.generatePalette(
            tertiary,
            this.themeCssVariables[2],
            10,
            onTertiary,
            systemDark
          );
          this.generatePalette(
            secondary,
            this.themeCssVariables[1],
            10,
            onSecondary,
            systemDark
          );
          this.generatePalette(
            error,
            this.themeCssVariables[3],
            10,
            onError,
            systemDark
          );
        });

        // img.onload = () => {
        //   const canvas = document.createElement('canvas');
        //   canvas.width = imgFile.width;
        //   canvas.height = imgFile.height;
        //   const ctx = canvas.getContext('2d');
        //   // ctx?.drawImage(imgFile, 0, 0);
        //   ctx?.drawImage(img, 0, 0, 500, 500);

        //   const imageData = ctx?.getImageData(
        //     0,
        //     0,
        //     canvas.width,
        //     canvas.height
        //   );

        //   console.log(imageData);

        //   // Convert the image data to RGB values so its much simpler
        //   const rgbArray = buildRgb(imageData?.data || []);

        //   /**
        //    * Color quantization
        //    * A process that reduces the number of colors used in an image
        //    * while trying to visually maintin the original image as much as possible
        //    */
        //   const quantColors = quantization(rgbArray, 0);

        //   // Create the HTML structure to show the color palette
        //   const themes = this.buildPalette(quantColors);
        //   canvas.remove();

        //   this.store.dispatch(
        //     appRootActions.saveThemes({
        //       themes,
        //     })
        //   );
        // };
        // img.src = base64String || '';
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }

  // public buildPalette(colorsList: any) {
  //   let themes: ApplicationTheme[] = [];
  //   const paletteContainer = document.getElementById('palette');
  //   const complementaryContainer = document.getElementById('complementary');
  //   // reset the HTML in case you load various images
  //   if (paletteContainer && complementaryContainer) {
  //     paletteContainer.innerHTML = '';
  //     complementaryContainer.innerHTML = '';
  //   }

  //   const orderedByColor = orderByLuminance(colorsList);
  //   // const hslColors = convertRGBtoHSL(orderedByColor);

  //   for (let i = 0; i < orderedByColor.length; i++) {
  //     const difference = calculateColorDifference(
  //       orderedByColor[i],
  //       i === 0 ? { r: 255, g: 255, b: 255 } : orderedByColor[i - 1]
  //     );

  //     // if the distance is less than 120 we ommit that color
  //     if (
  //       difference < 120 ||
  //       (orderedByColor.length > 5 && i === 0) ||
  //       (orderedByColor.length > 5 && i === orderedByColor.length - 1)
  //     ) {
  //       continue;
  //     }

  //     let primary = rgbToHex(orderedByColor[i]);
  //     let secundary = changeHue(primary, 10);
  //     let tertiary = changeHue(primary, 30);
  //     let warn = '#b3261e';

  //     if (this.contrast(primary) === '#000') {
  //       primary = increase_brightness(primary, -0.05);
  //     } else {
  //       primary = increase_brightness(primary, 0.05);
  //     }

  //     if (this.contrast(secundary) === '#000') {
  //       secundary = increase_brightness(secundary, -0.15);
  //     } else {
  //       secundary = increase_brightness(secundary, 0.15);
  //     }

  //     if (this.contrast(tertiary) === '#000') {
  //       tertiary = increase_brightness(tertiary, -0.2);
  //     } else {
  //       tertiary = increase_brightness(tertiary, 0.2);
  //     }

  //     const isDark = false;

  //     const count = i + 1;
  //     if (isDark) {
  //       primary = increase_brightness(primary, -0.5);
  //       secundary = increase_brightness(secundary, -0.25);
  //       tertiary = increase_brightness(tertiary, -0.25);
  //     } else {
  //       primary = increase_brightness(primary, 0.12);
  //       secundary = increase_brightness(secundary, 0.12);
  //       tertiary = increase_brightness(tertiary, 0.12);
  //     }

  //     const primaryBrightness = brightnessByColor(primary);
  //     const secundaryBrightness = brightnessByColor(secundary);
  //     const tertiaryBrightness = brightnessByColor(tertiary);

  //     if (Number(primaryBrightness) <= 50) {
  //       primary = increase_brightness(primary, 0.1);
  //     }

  //     if (Number(secundaryBrightness) <= 50) {
  //       secundary = increase_brightness(secundary, 0.1);
  //     }

  //     if (Number(tertiaryBrightness) <= 50) {
  //       tertiary = increase_brightness(tertiary, 0.1);
  //     }

  //     console.log(primary, secundary, tertiary);

  //     themes = [
  //       ...themes,
  //       {
  //         id: `theme${i}`,
  //         primary,
  //         secundary,
  //         tertiary,
  //         warn,
  //       },
  //     ];

  //     const colorElement = document.createElement('div');
  //     colorElement.style.backgroundColor = primary;
  //     colorElement.style.color = secundary;
  //     colorElement.style.border = 'solid 10px ' + tertiary;
  //     colorElement.appendChild(document.createTextNode(primary));
  //     paletteContainer?.appendChild(colorElement);
  //   }

  //   this.generatePalette(themes[1].primary, this.themeCssVariables[0], 10);
  //   this.generatePalette(themes[1].secundary, this.themeCssVariables[2], 10);
  //   this.generatePalette(themes[1].tertiary, this.themeCssVariables[1], 10);
  //   this.generatePalette(themes[1].warn, this.themeCssVariables[3], 10);

  //   return themes;
  // }

  public aumentarOpacidad1(colorBase: string, cantidad: number) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(colorBase)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(colorBase.slice(1, 3), 16);
    const g = parseInt(colorBase.slice(3, 5), 16);
    const b = parseInt(colorBase.slice(5, 7), 16);

    // Calcular decremento para cada componente
    const decrementoR = r / cantidad;
    const decrementoG = g / cantidad;
    const decrementoB = b / cantidad;

    // Generar colores más oscuros y vivos
    const coloresOscurosVivos = [];

    for (let i = 0; i < cantidad; i++) {
      const nuevoR = Math.max(0, Math.round(r - i * decrementoR));
      const nuevoG = Math.max(0, Math.round(g - i * decrementoG));
      const nuevoB = Math.max(0, Math.round(b - i * decrementoB));
      const nuevoColor = this.rgbToHex(nuevoR, nuevoG, nuevoB);
      coloresOscurosVivos.push(nuevoColor);
    }

    return coloresOscurosVivos;
  }

  public aumentarOpacidad(colorBase: string, cantidad: number) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(colorBase)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(colorBase.slice(1, 3), 16);
    const g = parseInt(colorBase.slice(3, 5), 16);
    const b = parseInt(colorBase.slice(5, 7), 16);

    // Calcular incremento para cada componente
    const incrementoR = (255 - r) / cantidad;
    const incrementoG = (255 - g) / cantidad;
    const incrementoB = (255 - b) / cantidad;

    // Generar colores que se acercan al blanco
    const coloresBlancos = [];

    for (let i = 0; i < cantidad; i++) {
      const nuevoR = Math.min(255, Math.round(r + i * incrementoR));
      const nuevoG = Math.min(255, Math.round(g + i * incrementoG));
      const nuevoB = Math.min(255, Math.round(b + i * incrementoB));
      const nuevoColor = this.rgbToHex(nuevoR, nuevoG, nuevoB);

      coloresBlancos.push(nuevoColor);
    }

    return coloresBlancos;
  }

  public rgbToHex(r: any, g: any, b: any) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

  /**
   * Generar array de colores.
   * @param colorStart - String.
   * @param prefix - String.
   * @param colorCount - Number.
   * @returns Array.
   */
  public generatePalette(
    colorStart: string,
    prefix: string,
    colorCount: number,
    contrastStart: string,
    dark: boolean
  ) {
    // Obtener el array de colores con diferentes opacidades
    let coloresOpacos = [];
    let contrastes = [];

    if (dark) {
      colorStart = this.aumentarSaturacion(colorStart, 30);
      coloresOpacos = this.aumentarOpacidad1(colorStart, colorCount).reverse();
      contrastes = this.aumentarOpacidad(contrastStart, colorCount).reverse();
    } else {
      colorStart = this.aumentarSaturacion(colorStart, 0);
      coloresOpacos = this.aumentarOpacidad(colorStart, colorCount).reverse();
      contrastes = this.aumentarOpacidad1(contrastStart, colorCount).reverse();
    }

    const palette = [];

    for (let i = 0; i < colorCount; i++) {
      const contrast = this.contrast(coloresOpacos[i]);
      palette.push({
        color: coloresOpacos[i],
        // contrast: contrastes[i],
        contrast: contrast,
      });
    }

    const palette_opacity = this.generateOpacityPalette(colorStart);

    this.setCssVars(palette, prefix, false);
    this.setCssVars(palette, prefix, true);
    this.setCssVars(palette_opacity, prefix, false, true);
    return palette;
  }

  /**
   * Valida si el color blanco o negro contrasta con el color que se envia.
   * @param colorHex - String.
   * @param threshold - Number.
   * @returns String.
   */
  public contrast(
    colorHex: string | undefined,
    threshold: number = 128
  ): '#000' | '#fff' {
    if (colorHex === undefined) {
      return '#000';
    }
    const rgb: RGB | undefined = this.hexToRgb(colorHex);
    if (rgb === undefined) {
      return '#000';
    }
    return this.rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
  }

  // Función para subir la saturación de un color en formato hexadecimal
  public aumentarSaturacion(color: string, incremento: any) {
    // Verificar si el color tiene formato hexadecimal (#RRGGBB)
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      throw new Error('El color debe estar en formato hexadecimal (#RRGGBB)');
    }

    // Convertir el color hexadecimal a valores RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Convertir RGB a HSL
    const hsl = this.rgbToHsl(r, g, b);

    // Aumentar la saturación
    hsl[1] = Math.min(100, hsl[1] + incremento);

    // Convertir HSL a RGB
    const nuevoColorRgb = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
    const nuevoColorHex = this.rgbToHex(
      nuevoColorRgb[0],
      nuevoColorRgb[1],
      nuevoColorRgb[2]
    );

    return nuevoColorHex;
  }

  // Función para convertir RGB a HSL
  public rgbToHsl(r: any, g: any, b: any) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // grayscale
    } else {
      const d = max - min;
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

    return [h * 360, s * 100, l * 100];
  }

  // Función para convertir HSL a RGB
  public hslToRgb(h: any, s: any, l: any) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: any, q: any, t: any) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  // /**
  //  * Convierte rgb a hex.
  //  * @param rgb - Array.
  //  * @returns String.
  //  */
  // private convertToHex(rgb: any[]) {
  //   return this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]);
  // }

  // /**
  //  * Convertir valor (r)(g)(b) a hex.
  //  * @param c - Color.
  //  * @returns String.
  //  */
  // private hex(c: any) {
  //   const s = '0123456789abcdef';
  //   let i = parseInt(c);
  //   if (i == 0 || isNaN(c)) return '00';
  //   i = Math.round(Math.min(Math.max(0, i), 255));
  //   return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
  // }

  /**
   * Convirete un color rgb a hex.
   * @param hex - Color hexadecimal.
   * @returns Any.
   */
  public hexToRgb(hex: string): RGB | undefined {
    if (!hex || hex === undefined || hex === '') {
      return undefined;
    }
    const result: RegExpExecArray | null =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : undefined;
  }

  /**
   * Valida el contraste del color con el modelo YIQ.
   * @param rgb - Color en formato RGB.
   * @returns Number.
   */
  public rgbToYIQ(rgb: RGB): number {
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  /**
   * Genera una paleta de colores con opacidad.
   * @param color - String.
   * @returns Array.
   */
  public generateOpacityPalette(color: string) {
    const colorRgb = this.convertToRGB(color);
    const palette = [];
    let max = 10;
    for (let i = 0; i < 10; i++) {
      const res =
        `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ` +
        `${i == 0 ? '' : '0.'}` +
        `${i == 9 ? '04' : i == 8 ? '09' : max--})`;
      const contrast = this.contrast(res);
      palette.push({
        color: res,
        contrast: contrast,
      });
    }
    return palette;
  }

  /**
   * Convierte el color hex a rgb.
   * @param hex - Color hexadecimal.
   * @returns Array.
   */
  private convertToRGB(hex: string) {
    const color = [];
    color[0] = parseInt(this.trim(hex).substring(0, 2), 16);
    color[1] = parseInt(this.trim(hex).substring(2, 4), 16);
    color[2] = parseInt(this.trim(hex).substring(4, 6), 16);
    return color;
  }

  /**
   * Elimina el # del hex.
   * @param c - Color.
   * @returns Any.
   */
  private trim(c: any) {
    return c.charAt(0) == '#' ? c.substring(1, 7) : c;
  }

  /**
   * Retorna el mismo color enviado con mas luminosidad.
   * @param hex - Color hexadecimal.
   * @param lum - Luminosidad.
   * @returns String.
   */
  public colorLuminance(hex: string, lum: number) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    let color = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      color += ('00' + c).substr(c.length);
    }
    return color;
  }
}

const getImageBase64 = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    // Cuando la imagen se carga correctamente
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const base64String = canvas.toDataURL(); // La imagen se convierte a base64
        resolve(base64String);
      } else {
        reject(new Error('No se pudo obtener el contexto del canvas.'));
      }
    };

    // Si hay un error al cargar la imagen
    image.onerror = () => {
      reject(new Error('No se pudo cargar la imagen.'));
    };

    image.crossOrigin = 'anonymous';

    // Inicia la descarga de la imagen
    image.src = imageUrl;
  });
};

// // Función para cambiar la opacidad de un color hexadecimal
// const cambiarOpacidad = (colorHex: any, opacidad: number) => {
//   // Remover el símbolo '#' del color hexadecimal
//   colorHex = colorHex.replace('#', '');

//   // Obtener los valores RGB del color hexadecimal
//   let r = parseInt(colorHex.substr(0, 2), 16);
//   let g = parseInt(colorHex.substr(2, 2), 16);
//   let b = parseInt(colorHex.substr(4, 2), 16);

//   // Calcular el valor de alfa (opacidad)
//   let alfa = opacidad.toFixed(2); // Ajustar la opacidad a dos decimales

//   // Devolver el color en formato RGBA
//   return `rgba(${r}, ${g}, ${b}, ${alfa})`;
// };

// /**
//  * Calculate brightness value by RGB or HEX color.
//  * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
//  * @returns (Number) The brightness value (dark) 0 ... 255 (light)
//  */
// const brightnessByColor = (colorHex: any) => {
//   // Convertir el color hexadecimal a HSL
//   let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
//   let r = parseInt(rgb ? rgb[1] : '0', 16);
//   let g = parseInt(rgb ? rgb[1] : '0', 16);
//   let b = parseInt(rgb ? rgb[1] : '0', 16);

//   // Convertir a valores en el modelo HSL
//   r /= 255;
//   g /= 255;
//   b /= 255;

//   let max = Math.max(r, g, b);
//   let min = Math.min(r, g, b);
//   let l = (max + min) / 2;

//   // Calcular el porcentaje de brillo
//   let porcentajeBrillo = Math.round(l * 100);

//   return porcentajeBrillo;
// };

// const increase_brightness = (colorHex: any, percent: number) => {
//   // Convertir el color hexadecimal a HSL
//   let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);

//   let r = parseInt(rgb ? rgb[1] : '0', 16);
//   let g = parseInt(rgb ? rgb[2] : '0', 16);
//   let b = parseInt(rgb ? rgb[3] : '0', 16);

//   // Convertir a valores en el modelo HSL
//   r /= 255;
//   g /= 255;
//   b /= 255;

//   let max = Math.max(r, g, b);
//   let min = Math.min(r, g, b);
//   let h = 0,
//     s,
//     l = (max + min) / 2;

//   if (max === min) {
//     h = s = 0; // Gris
//   } else {
//     let d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//     switch (max) {
//       case r:
//         h = (g - b) / d + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / d + 2;
//         break;
//       case b:
//         h = (r - g) / d + 4;
//         break;
//     }

//     h /= 6;
//   }

//   // Modificar el brillo
//   l += percent;

//   if (l > 1) {
//     l = 1;
//   } else if (l < 0) {
//     l = 0;
//   }

//   // Convertir de vuelta a RGB
//   let m1, m2;

//   if (s === 0) {
//     r = g = b = l;
//   } else {
//     m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
//     m1 = l * 2 - m2;

//     function hueToRgb(p: any, q: any, t: any) {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     }

//     r = hueToRgb(m1, m2, h + 1 / 3);
//     g = hueToRgb(m1, m2, h);
//     b = hueToRgb(m1, m2, h - 1 / 3);
//   }

//   // Convertir de vuelta a hexadecimal
//   r = Math.round(r * 255);
//   g = Math.round(g * 255);
//   b = Math.round(b * 255);

//   let resultHex = `#${r.toString(16).padStart(2, '0')}${g
//     .toString(16)
//     .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

//   return resultHex;
// };
// //  Convert each pixel value ( number ) to hexadecimal ( string ) with base 16
// const rgbToHex = (pixel: any) => {
//   const componentToHex = (c: any) => {
//     const hex = c.toString(16);
//     return hex.length == 1 ? '0' + hex : hex;
//   };

//   return (
//     '#' +
//     componentToHex(pixel.r) +
//     componentToHex(pixel.g) +
//     componentToHex(pixel.b)
//   ).toUpperCase();
// };

// /**
//  * Convert HSL to Hex
//  * this entire formula can be found in stackoverflow, credits to @icl7126 !!!
//  * https://stackoverflow.com/a/44134328/17150245
//  */
// const hslToHex = (hslColor: any) => {
//   const hslColorCopy = { ...hslColor };
//   hslColorCopy.l /= 100;
//   const a =
//     (hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100;
//   const f = (n: any) => {
//     const k = (n + hslColorCopy.h / 30) % 12;
//     const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//     return Math.round(255 * color)
//       .toString(16)
//       .padStart(2, '0');
//   };
//   return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
// };

// /**
//  * Using relative luminance we order the brightness of the colors
//  * the fixed values and further explanation about this topic
//  * can be found here -> https://en.wikipedia.org/wiki/Luma_(video)
//  */
// const orderByLuminance = (rgbValues: any) => {
//   const calculateLuminance = (p: any) => {
//     return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
//   };

//   return rgbValues.sort((p1: any, p2: any) => {
//     return calculateLuminance(p2) - calculateLuminance(p1);
//   });
// };

// const buildRgb = (imageData: any) => {
//   const rgbValues = [];
//   // note that we are loopin every 4!
//   // for every Red, Green, Blue and Alpha
//   for (let i = 0; i < imageData.length; i += 4) {
//     const rgb = {
//       r: imageData[i],
//       g: imageData[i + 1],
//       b: imageData[i + 2],
//     };

//     rgbValues.push(rgb);
//   }

//   return rgbValues;
// };

// /**
//  * Calculate the color distance or difference between 2 colors
//  *
//  * further explanation of this topic
//  * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
//  * note: this method is not accuarate for better results use Delta-E distance metric.
//  */
// const calculateColorDifference = (color1: any, color2: any) => {
//   const rDifference = Math.pow(color2.r - color1.r, 2);
//   const gDifference = Math.pow(color2.g - color1.g, 2);
//   const bDifference = Math.pow(color2.b - color1.b, 2);

//   return rDifference + gDifference + bDifference;
// };

// // returns what color channel has the biggest difference
// const findBiggestColorRange = (rgbValues: any) => {
//   /**
//    * Min is initialized to the maximum value posible
//    * from there we procced to find the minimum value for that color channel
//    *
//    * Max is initialized to the minimum value posible
//    * from there we procced to fin the maximum value for that color channel
//    */
//   let rMin = Number.MAX_VALUE;
//   let gMin = Number.MAX_VALUE;
//   let bMin = Number.MAX_VALUE;

//   let rMax = Number.MIN_VALUE;
//   let gMax = Number.MIN_VALUE;
//   let bMax = Number.MIN_VALUE;

//   rgbValues.forEach((pixel: any) => {
//     rMin = Math.min(rMin, pixel.r);
//     gMin = Math.min(gMin, pixel.g);
//     bMin = Math.min(bMin, pixel.b);

//     rMax = Math.max(rMax, pixel.r);
//     gMax = Math.max(gMax, pixel.g);
//     bMax = Math.max(bMax, pixel.b);
//   });

//   const rRange = rMax - rMin;
//   const gRange = gMax - gMin;
//   const bRange = bMax - bMin;

//   // determine which color has the biggest difference
//   const biggestRange = Math.max(rRange, gRange, bRange);
//   if (biggestRange === rRange) {
//     return 'r';
//   } else if (biggestRange === gRange) {
//     return 'g';
//   } else {
//     return 'b';
//   }
// };

// /**
//  * Median cut implementation
//  * can be found here -> https://en.wikipedia.org/wiki/Median_cut
//  */
// const quantization = (rgbValues: any, depth: any): any => {
//   const MAX_DEPTH = 4;

//   // Base case
//   if (depth === MAX_DEPTH || rgbValues.length === 0) {
//     const color = rgbValues.reduce(
//       (prev: any, curr: any) => {
//         prev.r += curr.r;
//         prev.g += curr.g;
//         prev.b += curr.b;

//         return prev;
//       },
//       {
//         r: 0,
//         g: 0,
//         b: 0,
//       }
//     );

//     color.r = Math.round(color.r / rgbValues.length);
//     color.g = Math.round(color.g / rgbValues.length);
//     color.b = Math.round(color.b / rgbValues.length);

//     return [color];
//   }

//   /**
//    *  Recursively do the following:
//    *  1. Find the pixel channel (red,green or blue) with biggest difference/range
//    *  2. Order by this channel
//    *  3. Divide in half the rgb colors list
//    *  4. Repeat process again, until desired depth or base case
//    */
//   const componentToSortBy = findBiggestColorRange(rgbValues);
//   rgbValues.sort((p1: any, p2: any) => {
//     return p1[componentToSortBy] - p2[componentToSortBy];
//   });

//   const mid = rgbValues.length / 2;
//   return [
//     ...quantization(rgbValues.slice(0, mid), depth + 1),
//     ...quantization(rgbValues.slice(mid + 1), depth + 1),
//   ];
// };

// // Changes the RGB/HEX temporarily to a HSL-Value, modifies that value
// // and changes it back to RGB/HEX.

// const changeHue = (rgb: any, degree: any) => {
//   var hsl = rgbToHSL(rgb);
//   hsl.h += degree;
//   if (hsl.h > 360) {
//     hsl.h -= 360;
//   } else if (hsl.h < 0) {
//     hsl.h += 360;
//   }
//   return hslToRGB(hsl);
// };

// // exepcts a string and returns an object
// const rgbToHSL = (rgb: any) => {
//   // strip the leading # if it's there
//   rgb = rgb.replace(/^\s*#|\s*$/g, '');

//   // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
//   if (rgb.length == 3) {
//     rgb = rgb.replace(/(.)/g, '$1$1');
//   }

//   var r = parseInt(rgb.substr(0, 2), 16) / 255,
//     g = parseInt(rgb.substr(2, 2), 16) / 255,
//     b = parseInt(rgb.substr(4, 2), 16) / 255,
//     cMax = Math.max(r, g, b),
//     cMin = Math.min(r, g, b),
//     delta = cMax - cMin,
//     l = (cMax + cMin) / 2,
//     h = 0,
//     s = 0;

//   if (delta == 0) {
//     h = 0;
//   } else if (cMax == r) {
//     h = 60 * (((g - b) / delta) % 6);
//   } else if (cMax == g) {
//     h = 60 * ((b - r) / delta + 2);
//   } else {
//     h = 60 * ((r - g) / delta + 4);
//   }

//   if (delta == 0) {
//     s = 0;
//   } else {
//     s = delta / (1 - Math.abs(2 * l - 1));
//   }

//   return {
//     h: h,
//     s: s,
//     l: l,
//   };
// };

// // expects an object and returns a string
// const hslToRGB = (hsl: any) => {
//   var h = hsl.h,
//     s = hsl.s,
//     l = hsl.l,
//     c = (1 - Math.abs(2 * l - 1)) * s,
//     x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
//     m = l - c / 2,
//     r,
//     g,
//     b;

//   if (h < 60) {
//     r = c;
//     g = x;
//     b = 0;
//   } else if (h < 120) {
//     r = x;
//     g = c;
//     b = 0;
//   } else if (h < 180) {
//     r = 0;
//     g = c;
//     b = x;
//   } else if (h < 240) {
//     r = 0;
//     g = x;
//     b = c;
//   } else if (h < 300) {
//     r = x;
//     g = 0;
//     b = c;
//   } else {
//     r = c;
//     g = 0;
//     b = x;
//   }

//   r = normalize_rgb_value(r, m);
//   g = normalize_rgb_value(g, m);
//   b = normalize_rgb_value(b, m);

//   return rgbToHex({ r, g, b });
// };

// const normalize_rgb_value = (color: any, m: any) => {
//   color = Math.floor((color + m) * 255);
//   if (color < 0) {
//     color = 0;
//   }
//   return color;
// };
