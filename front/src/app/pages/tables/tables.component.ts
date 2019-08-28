import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [UserService]
})
export class TablesComponent implements OnInit {

  public titulo: string;
  public users: User[];
  public identity;
  public token;
  public url: string;
  public confirmado;
  public divisa: string;
  public total: number;

  // Productos
  public cableado    = 1590000;
  public sellamiento = 560000;
  public mano        = 2500000;
  public fibra       = 5680000;
  public deco        = 2200000;


  // Monedas
  public dolar = 3100;
  public euro  = 3500;
  public won   = 2.79;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.titulo = 'Tablas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    this.getDivisa();
  }

  getDivisa() {
    this._route.params.forEach((params: Params) => {
      const parametro = params['divisa'];
      this.divisa = parametro;
      console.log(this.divisa);
      switch (this.divisa) {
        case 'Dolares':
          this.cableado = this.cableado / this.dolar;
          this.sellamiento = this.sellamiento / this.dolar;
          this.mano = this.mano / this.dolar;
          this.fibra = this.fibra / this.dolar;
          this.deco = this.deco / this.dolar;
          this.total = this.cableado + this.sellamiento + this.mano + this.fibra + this.deco;
          break;

        case 'Euros':
          this.cableado = this.cableado / this.euro;
          this.sellamiento = this.sellamiento / this.euro;
          this.mano = this.mano / this.euro;
          this.fibra = this.fibra / this.euro;
          this.deco = this.deco / this.euro;
          this.total = this.cableado + this.sellamiento + this.mano + this.fibra + this.deco;
          break;

        case 'Won':
          this.cableado = this.cableado / this.won;
          this.sellamiento = this.sellamiento / this.won;
          this.mano = this.mano / this.won;
          this.fibra = this.fibra / this.won;
          this.deco = this.deco / this.won;
          this.total = this.cableado + this.sellamiento + this.mano + this.fibra + this.deco;
          break;

        default:
          break;
      }
    });
  }
}
