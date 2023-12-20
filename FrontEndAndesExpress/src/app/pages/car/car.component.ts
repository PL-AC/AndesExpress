import { Component } from '@angular/core';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/sevices/car/car.service';
import { ClientService } from 'src/app/sevices/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  carLst: Car [] = [];
  clientes: any[] = [];

  constructor(private carService: CarService,private clienteService :ClientService){

  }

  ngOnInit(){
    this.listarAuto();
    this.cargarClientes();
  }

  titulo = 'Mantenimiento de Autos';

  clienteInput: number = 0;
  marcaInput: string = ''; 
  modeloInput: string = '';
  placaInput: string = '';

  listarAuto(){
    this.carService.obtenerAutos()
      .subscribe((data: any) => {
        console.log(data);
        this.carLst = data;
      })
  }
  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe(
      { next : (response : any) => {
        this.clientes = response; 
      },error : (error)=>{
        console.error('Error al cargar usuarios', error);
      }

      });
  }
  agregarAuto(){
    if(this.clienteInput === 0 ||this.marcaInput === "" || 
      this.modeloInput === "" || this.placaInput === "" ){
      Swal.fire(
        {
          position: 'center',
          icon: 'warning',
          title: 'Campos vacíos',
          text: 'Complete los datos solicitados'
        }
      );
    } else{
      let c = new Car();
      c.setIdClient(this.clienteInput)
      c.setBrand(this.marcaInput);
      c.setModel(this.modeloInput);
      c.setPlate(this.placaInput);

      this.carService.agregarAuto(c)
        .subscribe( 
          (response) => {

            Swal.fire({
              position:'center',
              icon: 'success',
              title:'Creación de auto',
              text: 'Se creó el auto satisfactoriamente!',
              showConfirmButton: true,
              showCloseButton: true,
              timer: 5000 
            });
            this.limpiarCampos();      
            this.listarAuto();
          },
          (error) => {
            console.log("Error en guardar auto:");
            console.log(error);
            Swal.fire(
              {
                position: 'center',
                icon: 'warning',
                title: 'Adventencia!',
                text: 'No se logró crear el auto, vuelva a intentar'
              }
            );
          }
        )
    } 
  }
  eliminarAuto(id: number){
    if(id>=0){
      this.carService.eliminarAuto(id)
        .subscribe(
          (response: any)=> {
            console.log("resulado eliminar auto: ");
            console.log(response);
              Swal.fire({
                position:'center',
                icon: 'success',
                title:'Eliminación de auto',
                text: 'Se eliminó el auto satisfactoriamente!',
                showConfirmButton: true,
                showCloseButton: true,
                timer: 5000 
              });

              this.listarAuto();
          },
          (error) => {
            console.log("Error en eliminar auto:")
            console.log(error);
            Swal.fire(
              {
                position: 'center',
                icon: 'warning',
                title: 'Adventencia!',
                text: 'No se logró eliminar el auto, vuelva a intentar'
              }
            );
          }
        )
    }
  }
  limpiarCampos(){
    this.clienteInput = 0;
    this.marcaInput = "";
    this.modeloInput = "";
    this.placaInput = "";
  }
}
