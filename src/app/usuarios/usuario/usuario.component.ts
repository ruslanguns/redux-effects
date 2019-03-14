import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

import * as usuarioActions from '../../store/actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  loading: boolean;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('usuario')
        .subscribe( usuario => {
          this.usuario = usuario.user;
          this.loading = usuario.loading;
          this.error = usuario.error;
        });

    this.route.params
        .subscribe( params => {
          const id = params.id;
          // console.log( id );
          this.store.dispatch( new usuarioActions.CargarUsuario( id ));
        });

  }

}
