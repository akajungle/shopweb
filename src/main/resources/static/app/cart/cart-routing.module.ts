import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CartComponent }    from './cart-list.component';


const cartRoutes: Routes = [
  { path: 'cart/:id', component: CartComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(cartRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule { }
