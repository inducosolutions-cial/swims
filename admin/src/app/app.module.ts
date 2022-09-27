import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './sharedComponents/login/login.component';
import { AuthgaurdGuard } from './services/authgaurd.guard';
import { AuthServiceService } from './services/auth-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
import { UsersComponent } from './views/users/users.component';
import { AttendenceComponent } from './views/attendence/attendence.component';
import { SitesComponent } from './views/sites/sites.component';
import { CustomersComponent } from './views/customers/customers.component';
import { RoutesComponent } from './views/routes/routes.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';
import { ChargesComponent } from './views/charges/charges.component';
import { PaymentsComponent } from './views/payments/payments.component';
import { ComplaintsComponent } from './views/complaints/complaints.component';
import { SettingsComponent } from './views/settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthgaurdGuard] },
  { path: 'attendence', component: AttendenceComponent, canActivate: [AuthgaurdGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthgaurdGuard] },
  { path: 'sites', component: SitesComponent, canActivate: [AuthgaurdGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthgaurdGuard] },
  { path: 'routes', component: RoutesComponent, canActivate: [AuthgaurdGuard] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthgaurdGuard] },
  { path: 'charges', component: ChargesComponent, canActivate: [AuthgaurdGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthgaurdGuard] },
  { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthgaurdGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthgaurdGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UsersComponent,
    AttendenceComponent,
    SitesComponent,
    CustomersComponent,
    RoutesComponent,
    VehiclesComponent,
    ChargesComponent,
    PaymentsComponent,
    ComplaintsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    AuthServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
