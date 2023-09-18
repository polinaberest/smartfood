import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/public/home/home.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuComponent } from './features/client/supplier/menu/menu/menu.component';
import { EditDishComponent } from './features/client/supplier/menu/edit-dish/edit-dish.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddDishComponent } from './features/client/supplier/menu/add-dish/add-dish.component';
import { ClientListComponent } from './features/public/components/client-list/client-list.component';
import { SuppliersListComponent } from './features/public/components/suppliers-list/suppliers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    EditDishComponent,
    AddDishComponent,
    ClientListComponent,
    SuppliersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    RadioButtonModule,
    FieldsetModule,
    InputNumberModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
