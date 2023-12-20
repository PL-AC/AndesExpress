import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
//import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { PagesComponent } from './pages.component';
import { IdentityGuard } from '../sevices/auth/identity.guard';
import { ClientComponent } from './client/client.component';
import { ClientService } from '../sevices/client/client.service';
import { CarComponent } from './car/car.component';
import { CarService } from '../sevices/car/car.service';
import { ParkingComponent } from './parking/parking.component';
import { ParkingService } from '../sevices/parking/parking.service';

/*
import { ClientComponent } from './Client/Client.component';
import { ClientService } from './Client/client.service';

import { UserService } from './User/user.service';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { IdentityGuard } from './sevices/auth/identity.guard';
import { HomeComponent } from './pages/home/home.component';*/

@NgModule({
  declarations: [
    PagesComponent,
    MenuComponent,
    ClientComponent,
    CarComponent,
    ParkingComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    //DataTablesModule,
    HttpClientModule
  ],
  providers: [IdentityGuard,ClientService,CarService,ParkingService],
  bootstrap: [PagesRoutingModule]
})
export class PagesModule { }