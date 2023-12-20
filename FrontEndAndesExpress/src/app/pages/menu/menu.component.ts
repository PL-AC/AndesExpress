import { Component } from '@angular/core';
import { LoginService } from 'src/app/sevices/auth/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public identity: any;
  public token:any;

  constructor(
  	private loginService: LoginService,
  ){
    this.loadUser();
  }

  loadUser(){
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
  }

}
