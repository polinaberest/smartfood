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
import { EditFridgeComponent } from './features/client/company/fridges/edit-fridge/edit-fridge.component';
import { AddFridgeRequestComponent } from './features/client/company/fridges/add-fridge-request/add-fridge-request.component';
import { RequestsListComponent } from './features/client/supplier/fridge-use-requests/requests-list/requests-list.component';
import { AddUseRequestComponent } from './features/client/supplier/fridge-use-requests/add-use-request/add-use-request.component';
import { ManageRequestsComponent } from './features/client/company/incoming-requests/manage-requests/manage-requests.component';
import { FilialsListComponent } from './features/client/company/filials/filials-list/filials-list.component';
import { EditFilialComponent } from './features/client/company/filials/edit-filial/edit-filial.component';
import { AddFilialComponent } from './features/client/company/filials/add-filial/add-filial.component';
import { FridgeInstallationRequestsComponent } from './features/admin/fridge-installation-requests/fridge-installation-requests.component';
import { SuppliersManagementComponent } from './features/admin/suppliers-management/suppliers-management.component';
import { OrganizationsManagementComponent } from './features/admin/organizations-management/organizations-management.component';
import { TechInspectionsManagementComponent } from './features/admin/tech-inspections-management/tech-inspections-management.component';
import { AddFridgeUriComponent } from './features/admin/add-fridge-uri/add-fridge-uri.component';

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
    path: 'food-supplier/:supplierId/requests',
    component: RequestsListComponent,
  },
  {
    path: 'food-supplier/:supplierId/make-supply-request',
    component: AddUseRequestComponent,
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
  {
    path: 'organization/:organizationId/edit-fridge/:id',
    component: EditFridgeComponent,
  },
  {
    path: 'organization/:organizationId/add-fridge-request',
    component: AddFridgeRequestComponent,
  },
  {
    path: 'organization/:organizationId/fridge-use-requests',
    component: ManageRequestsComponent,
  },
  {
    path: 'organization/:organizationId/filials',
    component: FilialsListComponent,
  },
  {
    path: 'organization/:organizationId/edit-filial/:id',
    component: EditFilialComponent,
  },
  {
    path: 'organization/:organizationId/add-filial',
    component: AddFilialComponent,
  },
  {
    path: 'admin/fridge-installation-requests',
    component: FridgeInstallationRequestsComponent,
  },
  {
    path: 'admin/food-suppliers-management',
    component: SuppliersManagementComponent,
  },
  {
    path: 'admin/organizations-management',
    component: OrganizationsManagementComponent,
  },
  {
    path: 'admin/tech-inspection-requests-management',
    component: TechInspectionsManagementComponent,
  },
  {
    path: 'admin/fridge-installation-requests/:requestId/add-uri',
    component: AddFridgeUriComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
