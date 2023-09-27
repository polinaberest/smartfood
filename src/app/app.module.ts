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
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuComponent } from './features/client/supplier/menu/menu/menu.component';
import { EditDishComponent } from './features/client/supplier/menu/edit-dish/edit-dish.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddDishComponent } from './features/client/supplier/menu/add-dish/add-dish.component';
import { ClientListComponent } from './features/public/components/client-list/client-list.component';
import { SuppliersListComponent } from './features/public/components/suppliers-list/suppliers-list.component';
import { FridgesListComponent } from './features/client/company/fridges/fridges-list/fridges-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { EditFridgeComponent } from './features/client/company/fridges/edit-fridge/edit-fridge.component';
import { MessagesModule } from 'primeng/messages';
import { AddFridgeRequestComponent } from './features/client/company/fridges/add-fridge-request/add-fridge-request.component';
import { RequestsListComponent } from './features/client/supplier/fridge-use-requests/requests-list/requests-list.component';
import { AddUseRequestComponent } from './features/client/supplier/fridge-use-requests/add-use-request/add-use-request.component';
import { ManageRequestsComponent } from './features/client/company/incoming-requests/manage-requests/manage-requests.component';
import { FilialsListComponent } from './features/client/company/filials/filials-list/filials-list.component';

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
    SuppliersListComponent,
    FridgesListComponent,
    NotFoundComponent,
    EditFridgeComponent,
    AddFridgeRequestComponent,
    RequestsListComponent,
    AddUseRequestComponent,
    ManageRequestsComponent,
    FilialsListComponent,
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
    InputTextareaModule,
    ToastModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
