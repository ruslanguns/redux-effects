import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as usuarioActions from '../actions';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    public usuarioService: UsuarioService
  ) { }

  @Effect()
  cargarUsuario$: Observable<Action> = this.actions$
    .pipe(
      ofType( usuarioActions.CARGAR_USUARIO ),
      switchMap( ( action: any ) => {

        // console.log( action );
        const id = action.id;

        return this.usuarioService.getUserById( id )
          .pipe(
            map( user => new usuarioActions.CargarUsuarioSuccess( user ) ),
            catchError( error => of( new usuarioActions.CargarUsuarioFail( error )))
          );
      })
    );
}
