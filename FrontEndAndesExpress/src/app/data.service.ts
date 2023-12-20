
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Client } from './model/client.model';
import { Car } from './model/car.model';
import { Parking } from './model/parking.model';

@Injectable()
export class DataService{
    ticketLst:  [] = [];
    constructor(private httpClient: HttpClient){}


    signup(user: User){
		const httpOptions = {
            headers: new HttpHeaders({
              "content-type": "application/json"
    
            })
        }    

        return this.httpClient.post('https://localhost:7114/user/login', JSON.stringify(user), httpOptions)
	}

    getToken(){
        let token = localStorage.getItem('token');
		if(token && token != "undefined"){
			return token;
		}else{
			return token;
		}
    }
    /* Cliente */
    cargarClientes(){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);

        return this.httpClient.get('https://localhost:7114/customer',{'headers':headers});
    }

    guardarCliente(cliente: Client){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);               

        return this.httpClient.post('https://localhost:7114/customer',cliente,{'headers':headers});
    }

    eliminarCliente(codigo: number){
        let url: string;
        url = 'https://localhost:7114/customer/' + codigo;

        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);  

        return this.httpClient.delete(url,{'headers':headers});
    }
    /* Autos */
    cargarAutos(){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);

        return this.httpClient.get('https://localhost:7114/car',{'headers':headers});
    }

    guardarAuto(car: Car){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);               

        return this.httpClient.post('https://localhost:7114/car',car,{'headers':headers});
    }

    eliminarAuto(codigo: number){
        let url: string;
        url = 'https://localhost:7114/car/' + codigo;

        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);  

        return this.httpClient.delete(url,{'headers':headers});
    }

    cargarDatosAutoXPlaca(placa: string){
        let url: string;
        url = 'https://localhost:7114/car/' + placa;

        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse); 

        return this.httpClient.get(url, {'headers':headers});
    }

    /* Parking */
    cargarParking(){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);

        return this.httpClient.get('https://localhost:7114/parking',{'headers':headers});
    }

    cargarParkingXPlaza(code: number){

        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);

        return this.httpClient.get('https://localhost:7114/parking/'+code,{'headers':headers});
    }

    guardarParking(parking: Parking){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);               

        return this.httpClient.post('https://localhost:7114/parking',parking,{'headers':headers});
    }

    eliminarParkingAuto(code: number){
        let tokenUse = this.getToken();

        const headers = new HttpHeaders().set('Authorization', 'Bearer '+tokenUse);               

        return this.httpClient.delete('https://localhost:7114/parking/'+code,{'headers':headers});
    }


}