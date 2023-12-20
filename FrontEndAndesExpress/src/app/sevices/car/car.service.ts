
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Car } from 'src/app/model/car.model';

@Injectable()
export class CarService{

    constructor(private dataService: DataService){}

    obtenerAutos(){
        return this.dataService.cargarAutos();
    }

    agregarAuto(car: Car){
        return this.dataService.guardarAuto(car);
    }

    obtenerAutoXPlaca(placa: string){
        return this.dataService.cargarDatosAutoXPlaca(placa);
    }

    eliminarAuto(code: number){
        return this.dataService.eliminarAuto(code);
    }
}