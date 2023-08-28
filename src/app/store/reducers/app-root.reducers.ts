import { createReducer, on } from '@ngrx/store';
import { appRootActions } from '../actions/app-root.actions';
import { ApplicationTheme } from 'src/app/models/app-root.model';

export interface AppRootState {
  themes: ApplicationTheme[];
  activeTheme: ApplicationTheme | undefined;
}

export const initialState: AppRootState = {
  themes: [],
  activeTheme: undefined,
};

export const counterReducer = createReducer(
  initialState,
  on(appRootActions.resetApplication, (state) => {
    return {
      ...state,
      ...initialState,
    };
  }),
  on(appRootActions.saveThemes, (state, { themes }) => {
    return {
      ...state,
      themes,
    };
  }),
  on(appRootActions.selectTheme, (state, { theme }) => {
    return {
      ...state,
      theme,
    };
  })
);
