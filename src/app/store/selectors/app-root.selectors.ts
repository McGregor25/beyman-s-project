import { createSelector } from '@ngrx/store';
import { featureAppRoot, AppRootState } from '../app-root-module.reducers';

export const selectThemes = createSelector(
  featureAppRoot,
  (state: AppRootState) => state.core.themes
);

export const selectActiveTheme = createSelector(
  featureAppRoot,
  (state: AppRootState) => state.core.activeTheme
);
