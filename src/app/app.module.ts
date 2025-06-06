// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Tu componente raíz
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  // 'declarations' lista los componentes, directivas y pipes que PERTENECEN a este NgModule.
  // Es donde le dices a Angular: "Estos son los elementos UI que define mi módulo."
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContactListComponent,
    ContactFormComponent,
    NavbarComponent
  ],
  // 'imports' lista otros NgModules cuyas directivas, componentes o pipes
  // QUIERES UTILIZAR en los templates de los componentes declarados en 'declarations' de este módulo.
  // Por ejemplo, necesitas BrowserModule para funcionalidades básicas del navegador,
  // FormsModule para [(ngModel)], CommonModule para *ngIf, etc.
  imports: [
    BrowserModule,       
    AppRoutingModule,    
    HttpClientModule,    
    FormsModule,         
    CommonModule         
  ],
  // 'providers' es para los servicios que el inyector de dependencias debe conocer.
  // Aquí es donde defines los servicios que quieres que estén disponibles.
  providers: [],
  // 'bootstrap' especifica el componente raíz que Angular debe lanzar al iniciar la aplicación.
  // Siempre debe ser un componente (en tu caso, AppComponent), no un módulo.
  bootstrap: [AppComponent] // <-- ¡Esto es lo que va aquí! No AppModule.
})
// La clase AppModule es el módulo raíz de la aplicación Angular.
// Es la puerta de entrada principal para el bootstrapping de Angular.
export class AppModule { }