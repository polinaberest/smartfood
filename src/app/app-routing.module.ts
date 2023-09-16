import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/public/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MenuComponent } from './features/client/supplier/menu/menu/menu.component';
import { AddDishComponent } from './features/client/supplier/menu/add-dish/add-dish.component';
import { EditDishComponent } from './features/client/supplier/menu/edit-dish/edit-dish.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'food-supplier/menu',
    component: MenuComponent,
  },
  {
    path: 'food-supplier/menu/add-dish',
    component: AddDishComponent
  },
  {
    path: 'food-supplier/edit-dish/:id',
    component: EditDishComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
