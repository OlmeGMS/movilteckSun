import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global.service';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Moviltecksun';
  public user: User;
  public rol;
  public identity;
  public token;
  public errorMessage;
  public myDate = Date.now();
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.user = new User('', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.rol = this._userService.getRol();

  }


  public onSubmit() {
    console.log(this.user);
    this._userService.singup(this.user).subscribe(

      response => {
          const identity = response.user;
          this.identity = identity;

          if (!this.identity._id) {
            alert('El usuario no está correctamente indentificado');
          } else {
            // Crear elemento en ele localstorage para tener al usuario sesión
              localStorage.setItem('identity', JSON.stringify(identity));
            // Conseguir el token para enviarlo a cada petición http
              this._userService.singup(this.user, 'true').subscribe(
              res => {
                  const token = res.token;
                  this.token = token;

                  if (this.token.length <= 0) {
                    alert('El token no se ha generado correctamente');
                  } else {
                    // Crear elemento en el localstorage para tener el token
                    localStorage.setItem('token', token);
                    this._router.navigate(['/']);
                    this.user = new User('', '', '', '', '', '');
                  }
              },
              error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    const body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                    console.log(error);
                }
              }
            );
          }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
            this.errorMessage = 'Error en las credenciales';
            console.log(error);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }



}
