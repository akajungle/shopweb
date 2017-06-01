import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {CartComponent}    from './cart-list.component';

import {CartService} from './cart.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {CartRoutingModule} from './cart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule
  ],
  declarations: [
    CartComponent,
  ],
  providers: [ CartService, CookieService ]
})
export class CartModule {}
