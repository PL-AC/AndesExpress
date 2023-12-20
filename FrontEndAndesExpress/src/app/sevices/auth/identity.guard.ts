import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class IdentityGuard implements CanActivate{

	constructor(
		private router: Router,
		private loginService: LoginService
	){}

	canActivate(){
		let identity = this.loginService.getIdentity();

		if(identity){
			return true;
		}else{
			this.router.navigate(['/login']);
			return false;
		}

	}
}