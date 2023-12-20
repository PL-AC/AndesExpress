import { Component , OnInit } from '@angular/core';
import { LoginService } from 'src/app/sevices/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  identity: boolean = false;
  public token:any;

  constructor(
  	private loginService: LoginService
  ){
    this.loadUser();
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity= this.loginService.getIdentity();
    /*let validate = this.loginService.getIdentity();
    if (validate!=null) {      
      this.identity = true;
    }*/
    this.token = this.loginService.getToken();
  }
}
