import { Component,ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormBuilder,Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/sevices/auth/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public token: any;
	public identity: any;
  loginForm= this.formBuilder.group({
    username : ["",[Validators.required]],
    password : ["",[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder,
    private loginService: LoginService,
		private router: Router,
    private routeActivated: ActivatedRoute,
    private cdr: ChangeDetectorRef){
    
  }
  
  ngOnInit(){
    this.logoutUser();
  }

  get username(){
    return this.loginForm.controls.username;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  loginUsuario(){
    if(this.loginForm.validator){
      this.loginForm.markAllAsTouched();
      Swal.fire(
        {
          position: 'center',
          icon: 'warning',
          title: 'Campos vacíos',
          text: 'Complete los datos solicitados'
        }
      );
    } else{
      this.loginService.signup(this.loginForm.value as User)
        .subscribe({
          next: (response) => {
            if(response.user != null){              
              this.cdr.detectChanges();
              localStorage.setItem('token', response.token);
              localStorage.setItem('identity', JSON.stringify(response));                
              Swal.fire({
                position:'center',
                icon: 'success',
                title:'Logeo',
                text: 'Se logeo satisfactoriamente!',
                showConfirmButton: true,
                showCloseButton: true,
                timer: 5000 
              });
              this.loginForm.reset();
              this.router.navigate(['pages']);  
            }else {
              Swal.fire(
                {
                  position: 'center',
                  icon: 'warning',
                  title: 'Datos invalidos',
                  text: 'Revise sus crendenciales.'
                });
            }
          },
          error: (error) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'No se logró logear, vuelva a intentar'
              }
            );
          },
          complete : ()=>{
          }
        })
    } 
  }
  logoutUser(){
    this.routeActivated.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = false;
				this.token = false;
        
        this.cdr.detectChanges();
				this.router.navigate(['']);

			}
		});
  }
}
