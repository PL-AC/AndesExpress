
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Client } from 'src/app/model/client.model';

@Injectable()
export class ClientService{

    constructor(private dataService: DataService){}

    obtenerClientes(){
        return this.dataService.cargarClientes();
    }

    agregarCliente(client: Client){
        return this.dataService.guardarCliente(client);
    }

    eliminarCliente(code: number){
        return this.dataService.eliminarCliente(code);
    }
}