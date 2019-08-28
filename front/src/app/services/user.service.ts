import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../services/global.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public identity;
  public token;
  public rol;
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user): Observable<any> {
    // Convertir el objeto del usuario a un json string
    const params = JSON.stringify(user);

    // Definir las cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Hacer la petición ajax
    return this._http.post(this.url + 'register', params, {headers: headers});
  }

  singup(user, gettoken = null): Observable<any> {

    // Comporbar si llega el token
    if (gettoken != null) {
      user.gettoken = gettoken;
    }

    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, {headers: headers});

  }

  getUsers(token, page): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'users/' + page, {headers: headers});
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;

  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getRol() {
    const rol = localStorage.getItem('rol');

    if (rol !== 'undefined') {
      this.rol = rol;
    } else {
      this.rol = null;
    }

    return this.rol;
  }



}
