import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public identity: any;
	public token: any;
  constructor(private httpClient: HttpClient) {
    
  }

  signup(user: User):Observable<any>{
		const httpOptions = {
            headers: new HttpHeaders({
              "content-type": "application/json"
    
            })
        }    

        return this.httpClient.post('https://localhost:7114/user/login', JSON.stringify(user), httpOptions).
        pipe(catchError(this.handlerError))
	}

  private handlerError(error:HttpErrorResponse){
    if (error.status === 0) {
      
    }else{
      console.error("status error: ",error.status, error.error);
    }
    return throwError(()=> new Error("Intente nuevamente."))
  }
  getIdentity(){
		let item = localStorage.getItem('identity');
    let identity = item ? JSON.parse(item) : null;
    
		if(identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token && token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}
  
}
