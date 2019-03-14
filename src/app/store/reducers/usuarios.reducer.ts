import { Usuario } from 'src/app/models/usuario.model';

import * as fromUsuarios from './../actions';


export interface UsuariosState {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const estadoInicial: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null
};

export function usuariosReducer( state = estadoInicial, actions: fromUsuarios.usuariosAcciones ): UsuariosState {

  switch ( actions.type ) {

    case fromUsuarios.CARGAR_USUARIOS:
      return {
        ...state,
        loading: true
      };

    case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        users: [...actions.usuarios]
      };

    case fromUsuarios.CARGAR_USUARIOS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
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
