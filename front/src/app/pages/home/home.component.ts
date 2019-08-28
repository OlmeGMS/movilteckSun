import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public titulo: string;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public divisa;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.titulo = 'Seleccion de divisa';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
  }

  getDivisaSelect(divisa) {
    console.log(divisa);
  }

  onSubmit() {
    console.log(this.divisa);
    this._router.navigate(['tablas/', this.divisa]);
  }

}
