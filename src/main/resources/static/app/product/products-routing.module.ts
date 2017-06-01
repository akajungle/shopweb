import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductListComponent }    from './product-list.component';
import {ProductDetailComponent }  from './product-detail.component';

const productsRoutes: Routes = [
  { path: 'products',  component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
