import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ShopComponent}  from './shop.component';
import {RouterModule, Router} from '@angular/router';

import {AppRoutingModule}        from './app-routing.module';
import {ProductsModule}            from './product/products.module';

@NgModule ({
  declarations: [ShopComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ProductsModule,
    AppRoutingModule
  ],
  bootstrap:    [ShopComponent]
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
