import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApplicationTheme } from 'src/app/models/app-root.model';

/**
 * Acciones de la raiz de la aplicacion.
 */
export const appRootActions = createActionGroup({
  source: 'appRootActions',
  events: {
    'reset application': emptyProps(),
    'save themes': props<{
      /**
       * Temas de la aplicacion.
       */
      themes: ApplicationTheme[];
    }>(),
    'select theme': props<{
      /**
       * Temas de la aplicacion.
       */
      theme: ApplicationTheme;
    }>(),
  },
});
