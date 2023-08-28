import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as reducers from './reducers/app-root.reducers';

export interface AppRootState {
  core: reducers.AppRootState;
}

export const appRootReducers: ActionReducerMap<AppRootState> = {
  core: reducers.counterReducer,
};

/**
 * Selector.
 * @param state - Estado.
 * @returns Token.
 */
export const featureAppRoot = createFeatureSelector<AppRootState>('appRoot');
