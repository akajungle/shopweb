import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '',   redirectTo: '/products', pathMatch: 'full' },
  //{ path: 'cart', redirectTo: '/cart', pathMatch: 'cart'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppRoutingModule { }
