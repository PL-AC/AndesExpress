
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Car } from 'src/app/model/car.model';
import { Parking } from 'src/app/model/parking.model';

@Injectable()
export class ParkingService{

    constructor(private dataService: DataService){}

    obtenerParking(){
        return this.dataService.cargarParking();
    }

    obtenerParkingXEstacionamiento(code: number){
        return this.dataService.cargarParkingXPlaza(code);
    }

    agregarParking(p: Parking){
        return this.dataService.guardarParking(p);
    }

    eliminarParking(code: number){
        return this.dataService.eliminarParkingAuto(code);
    }
}