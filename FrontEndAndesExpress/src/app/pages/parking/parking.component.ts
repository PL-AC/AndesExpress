import { Component } from '@angular/core';
import { Parking } from 'src/app/model/parking.model';
import { CarService } from 'src/app/sevices/car/car.service';
import { ParkingService } from 'src/app/sevices/parking/parking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {    
  carId: number = 0; 
  parkingLst: any[] = [];
  parkingByLot: any[] = [];

  ngOnInit(){
    this.listarParking();
  }

  titulo = 'Mantenimiento de Parking';

  parkingLotInput: number = 0;
  // valores de auto
  nombreCliente: string = '';  
  marcaInput: string = ''; 
  modeloInput: string = '';
  placaInput: string = '';

  constructor(private carService:CarService,private parkingService: ParkingService){}

  consultarPlaca() {
    if (this.placaInput && this.placaInput.length >=5) {
      this.carService.obtenerAutoXPlaca(this.placaInput).subscribe((data: any) => {     
        console.log(data);   
        if (data && data.customer.fullName && data.brand) {
          this.carId = data.id;
          this.nombreCliente = data.customer.fullName;
          this.marcaInput = data.brand;
          this.modeloInput = data.model;
        } else {
          this.limpiarCampos(); 
        }
      });
    }else{
      this.limpiarCampos(); 
    }
  }
  listarParking(){
    this.parkingService.obtenerParking()
    .subscribe((data: any) => {
      console.log(data);
      this.parkingLst = data;
    })
  }
  verAutos(code: number){
    this.parkingService.obtenerParkingXEstacionamiento(code)
    .subscribe((data: any) => {
      console.log(data);
      this.parkingByLot = data;
    })
  }

  agregarParking(){
    if(this.carId === 0  || this.parkingLotInput === 0||this.nombreCliente === ""){
      Swal.fire(
        {
          position: 'center',
          icon: 'warning',
          title: 'Campos vacíos',
          text: 'Complete los datos solicitados'
        }
      );
    }else {
      let p = new Parking();
      p.setIdCar(this.carId);
      p.setParkingLotId(this.parkingLotInput);

      this.parkingService.agregarParking(p).
      subscribe({ 
          next : (response : any) => {
            Swal.fire({
              position:'center',
              icon: 'success',
              title:'Parqueo de auto',
              text: 'Se parqueo el auto satisfactoriamente!',
              showConfirmButton: true,
              showCloseButton: true,
              timer: 5000 
            });            
            this.parkingLotInput = 0;
            this.limpiarCampos();      
            this.listarParking();
          }, error : (error) => {
            Swal.fire(
              {
                position: 'center',
                icon: 'warning',
                title: 'Adventencia!',
                text: 'No se logró parquear el auto, vuelva a intentar'
              }
            );
          }

        })
    }
  }

  eliminarParking(code: number){
    if (code>=1) {      
      this.parkingService.eliminarParking(code)
      .subscribe({
        next : (response:any)=>{
          Swal.fire({
            position:'center',
            icon: 'success',
            title:'Salida de auto',
            text: 'Salio el auto del estacionamiento satisfactoriamente!',
            showConfirmButton: true,
            showCloseButton: true,
            timer: 5000 
          });
          this.verAutos(code);
          this.listarParking();
        },
        error : (error) =>{
          console.log(error);
              Swal.fire(
                {
                  position: 'center',
                  icon: 'warning',
                  title: 'Adventencia!',
                  text: 'No se logró la salida del auto, vuelva a intentar'
                }
              );
        }
      })
    }
  }
  limpiarCampos(){    
    this.carId = 0;
    this.placaInput = '';
    this.nombreCliente = '';
    this.marcaInput = '';
    this.modeloInput = '';
  }
}
