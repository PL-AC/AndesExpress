import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './auth/login/login.component';
import { IdentityGuard } from './sevices/auth/identity.guard';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    //DataTablesModule,
    HttpClientModule
  ],
  providers: [DataService,IdentityGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
