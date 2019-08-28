import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {

  public user: User;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
