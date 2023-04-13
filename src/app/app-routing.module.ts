import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path:"",
    loadChildren:()=>import('./home/home.module').then(x=>x.HomeModule)
  },
  {
    path:"Admin",
    loadChildren:()=>import('./admin/admin.module').then(x=>x.AdminModule),
    canActivate:[AuthGuard]
  },
  {
    path:"Auth",
    loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)
  },
  {
    path:"Doctor",
    loadChildren:()=>import('./doctor/doctor.module').then(x=>x.DoctorModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
