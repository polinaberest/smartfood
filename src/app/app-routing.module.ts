import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/public/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MenuComponent } from './features/client/supplier/menu/menu/menu.component';
import { AddDishComponent } from './features/client/supplier/menu/add-dish/add-dish.component';
import { EditDishComponent } from './features/client/supplier/menu/edit-dish/edit-dish.component';
import { FridgesListComponent } from './features/client/company/fridges/fridges-list/fridges-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
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
    path: 'food-supplier/:supplierId/menu',
    component: MenuComponent,
  },
  {
    path: 'food-supplier/:supplierId/add-dish',
    component: AddDishComponent,
  },
  {
    path: 'food-supplier/:supplierId/edit-dish/:id',
    component: EditDishComponent,
  },
  {
    path: 'organization/:organizationId/smartfridges-list',
    component: FridgesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
