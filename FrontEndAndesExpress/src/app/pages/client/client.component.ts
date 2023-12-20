import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/sevices/client/client.service';
import { Client } from 'src/app/model/client.model';


@Component({
  selector: 'client-root',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  clienteLst: Client[] = [];

  
  constructor(private clientService: ClientService){

  }
  
 
  ngOnInit(){
    this.clientService.obtenerClientes()
      .subscribe((data: any) => {
        console.log(data);
        this.clienteLst = data;
      })
  }

  titulo = 'Mantenimiento de Clientes';

  nombreInput: string = ''; 
  celularInput: string = '';
  emailInput: string = '';

  listarCliente(){
    this.clientService.obtenerClientes()
      .subscribe((data: any) => {
        console.log(data);
        this.clienteLst = data;
      })
  }
  agregarCliente(){
    if(this.nombreInput === "" || this.celularInput === "" || this.emailInput === "" ){
      Swal.fire(
        {
          position: 'center',
          icon: 'warning',
          title: 'Campos vacíos',
          text: 'Complete los datos solicitados'
        }
      );
    } else{
      let c = new Client();
      c.setFullName(this.nombreInput);
      c.setPhone(this.celularInput);
      c.setEmail(this.emailInput);

      this.clientService.agregarCliente(c)
        .subscribe( 
          (response) => {

            Swal.fire({
              position:'center',
              icon: 'success',
              title:'Creación de cliente',
              text: 'Se creó el cliente satisfactoriamente!',
              showConfirmButton: true,
              showCloseButton: true,
              timer: 5000 
            });
            this.limpiarCampos();      
            this.listarCliente();
          },
          (error) => {
            console.log("Error en guardar Clientes:");
            console.log(error);
            Swal.fire(
              {
                position: 'center',
                icon: 'warning',
                title: 'Adventencia!',
                text: 'No se logró crear el cliente, vuelva a intentar'
              }
            );
          }
        )
    } 
  }
  eliminarCliente(id: number){
    if(id>=0){

      this.clientService.eliminarCliente(id)
        .subscribe(
          (response: any)=> {
            console.log("resulado eliminar cliente: ");
            console.log(response);
              Swal.fire({
                position:'center',
                icon: 'success',
                title:'Eliminación de cliente',
                text: 'Se eliminó el cliente satisfactoriamente!',
                showConfirmButton: true,
                showCloseButton: true,
                timer: 5000 
              });

              this.listarCliente();
          },
          (error) => {
            console.log("Error en eliminar cliente:")
            console.log(error);
            Swal.fire(
              {
                position: 'center',
                icon: 'warning',
                title: 'Adventencia!',
                text: 'No se logró eliminar el cliente, vuelva a intentar'
              }
            );
          }
        )
    }
  }
  limpiarCampos(){
    this.nombreInput = "";
    this.celularInput = "";
    this.emailInput = "";
  }
}