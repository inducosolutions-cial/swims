import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'materials',
    loadChildren: () => import('./materials/materials.module').then( m => m.MaterialsPageModule)
  },
  {
    path: 'amounts',
    loadChildren: () => import('./amounts/amounts.module').then( m => m.AmountsPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'managemeterial',
    loadChildren: () => import('./managemeterial/managemeterial.module').then( m => m.ManagemeterialPageModule)
  },
  {
    path: 'manageprojects',
    loadChildren: () => import('./manageprojects/manageprojects.module').then( m => m.ManageprojectsPageModule)
  },
  {
    path: 'managesites',
    loadChildren: () => import('./managesites/managesites.module').then( m => m.ManagesitesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'recordpreview',
    loadChildren: () => import('./recordpreview/recordpreview.module').then( m => m.RecordpreviewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
