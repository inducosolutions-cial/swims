import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'materials',
    loadChildren: () =>
      import('./materials/materials.module').then((m) => m.MaterialsPageModule),
  },
  {
    path: 'amounts',
    loadChildren: () =>
      import('./amounts/amounts.module').then((m) => m.AmountsPageModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((m) => m.ProjectsPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'managemeterial',
    loadChildren: () =>
      import('./managemeterial/managemeterial.module').then(
        (m) => m.ManagemeterialPageModule
      ),
  },
  {
    path: 'manageprojects',
    loadChildren: () =>
      import('./manageprojects/manageprojects.module').then(
        (m) => m.ManageprojectsPageModule
      ),
  },
  {
    path: 'managesites',
    loadChildren: () =>
      import('./managesites/managesites.module').then(
        (m) => m.ManagesitesPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'recordpreview',
    loadChildren: () =>
      import('./views/recordpreview/recordpreview.module').then(
        (m) => m.RecordpreviewPageModule
      ),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('./views/collection/collection.module').then(
        (m) => m.CollectionPageModule
      ),
  },
  {
    path: 'processing',
    loadChildren: () =>
      import('./views/processing/processing.module').then(
        (m) => m.ProcessingPageModule
      ),
  },
  {
    path: 'biomining',
    loadChildren: () =>
      import('./views/biomining/biomining.module').then(
        (m) => m.BiominingPageModule
      ),
  },
  {
    path: 'recovery',
    loadChildren: () =>
      import('./views/recovery/recovery.module').then(
        (m) => m.RecoveryPageModule
      ),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./views/report/report.module').then((m) => m.ReportPageModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./views/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./views/payment/payment.module').then( m => m.PaymentPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
