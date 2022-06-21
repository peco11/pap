import {EventEmitter, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';

import * as AuthActions from './auth.actions';
import {AuthService} from './auth.service';
import {AlertController, AlertOptions} from '@ionic/angular';
import {AppState} from '../../core.state';
import {Store} from '@ngrx/store';
const SUCESSFULLY_UPDATE: AlertOptions = {
  header: 'Aggiornamento avvenuto con successo',
  message: 'i dati relativi al tuo profilo sono stati aggiornati',
  buttons: ['ok'],
};
const SUCESSFULLY_LOGIN: AlertOptions = {
  header: 'LOGIN',
  message: 'avvenuto con successo',
  buttons: ['ok'],
};
const SUCESSFULLY_REGISTRATION: AlertOptions = {
  header: 'REGISTRAZIONE',
  message: 'avvenuta con successo',
  buttons: ['ok'],
};
@Injectable()
export class AuthEffects {
  private _alertEVT: EventEmitter<AlertOptions> = new EventEmitter<AlertOptions>();
  private _alertSub: Subscription = Subscription.EMPTY;

  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuths),
      switchMap(_ =>
        this._authSvc.getUser().pipe(
          map(user => AuthActions.loadAuthsSuccess({user})),
          catchError(error => {
            return of(AuthActions.loadAuthsFailure({error}));
          }),
        ),
      ),
    );
  });

  loadSignin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadSignIns),
      switchMap(action =>
        this._authSvc.login(action).pipe(
          map(user => {
            this._alertEVT.emit(SUCESSFULLY_LOGIN);
            return AuthActions.loadSignInsSuccess({user});
          }),
          catchError(error => {
            return of(AuthActions.loadSignInsFailure({error}));
          }),
        ),
      ),
    );
  });

  loadSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadSignUps),
      switchMap(action =>
        this._authSvc.register(action).pipe(
          map(user => {
            this._alertEVT.emit(SUCESSFULLY_REGISTRATION);
            return AuthActions.loadSignUpsSuccess({user});
          }),
          catchError(error => {
            return of(AuthActions.loadSignUpsFailure({error}));
          }),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.UpdateUser),
      switchMap(action =>
        this._authSvc.update(action.updates).pipe(
          map(user => {
            this._alertEVT.emit(SUCESSFULLY_UPDATE);
            return AuthActions.UpdateUserSuccess({user});
          }),
          catchError(error => {
            return of(AuthActions.UpdateUserFailure({error}));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private _authSvc: AuthService,
    private _alertCtrl: AlertController,
    private _store: Store<AppState>,
  ) {
    this._alertSub = this._alertEVT
      .pipe(
        switchMap(opt => this._alertCtrl.create(opt)),
        switchMap(alert => {
          alert.present();
          return alert.onWillDismiss();
        }),
      )
      .subscribe(_ => {
        this._store.dispatch(AuthActions.loadAuths());
      });
  }
}
