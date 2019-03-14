import { Usuario } from '../../models/usuario.model';

import * as fromUsuario from './../actions';


export interface UsuarioState {
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const estadoInicial: UsuarioState = {
  user: null,
  loaded: false,
  loading: false,
  error: null
};

export function usuarioReducer( state = estadoInicial, actions: fromUsuario.usuarioAcciones ): UsuarioState {

  switch ( actions.type ) {

    case fromUsuario.CARGAR_USUARIO:
      return {
        ...state,
        loading: true,
        error: null
      };

    case fromUsuario.CARGAR_USUARIO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: {...actions.usuario}
      };

    case fromUsuario.CARGAR_USUARIO_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        user: null,
        error: {
          status: actions.payload.status,
          message: actions.payload.message,
          url: actions.payload.url,
          ok: actions.payload.ok
        }
      };

    default:
      return state;
  }
}
