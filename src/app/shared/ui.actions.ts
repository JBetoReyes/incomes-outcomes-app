import {Action} from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading] cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
}

export type actions = ActivarLoadingAction | DesactivarLoadingAction;