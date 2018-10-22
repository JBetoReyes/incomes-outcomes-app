import * as fromIngresoEgreso from './ingreso-egreso.actions';
import {IngresoEgreso} from './ingreso-egreso.model';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
  items: [],
};

export function IngresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.actions): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgreso.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => ({ ...item }) )
        ]
      };
    case fromIngresoEgreso.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
