import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {ProductListComponent}    from './product-list.component';
import {ProductDetailComponent}  from './product-detail.component';
import {CartComponent} from '../cart/cart-list.component';

import {ProductService} from './product.service';
import {CartService} from '../cart/cart.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {ProductRoutingModule} from './products-routing.module';
import {CartRoutingModule} from '../cart/cart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    CartRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CartComponent
  ],
  providers: [ ProductService, CartService, CookieService ]
})
export class ProductsModule {}
