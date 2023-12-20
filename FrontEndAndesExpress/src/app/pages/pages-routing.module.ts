import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IdentityGuard } from '../sevices/auth/identity.guard';
import { LoginComponent } from '../auth/login/login.component';
import { ClientComponent } from './client/client.component';
import { CarComponent } from './car/car.component';
import { ParkingComponent } from './parking/parking.component';


const routes: Routes = [
    {path: '', component: PagesComponent, children: 
    [
        {path: 'clientes', component: ClientComponent,  canActivate: [IdentityGuard]},    
        {path: 'logout/:sure', component: LoginComponent},
        {path:'autos',component: CarComponent},
        {path:'parking',component: ParkingComponent}
    ]     
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
