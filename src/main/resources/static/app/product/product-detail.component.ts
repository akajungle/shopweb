import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product, ProductService }  from './product.service';
import {CartService} from '../cart/cart.service';


@Component({
  template: `
  <h2>PRODUCTS</h2>
  <div *ngIf="product">
    <h3>"{{ product.name }}"</h3>
    <div>
      <label>Id: </label>{{ product.id }}</div>
    <div>
      <label>Name: </label>{{product.name}}</div>
    <div>
      <label>Price: </label>{{product.price}}</div>
    <div>
    <div>
      <label>Inventory: </label>{{product.quantity}}</div>
    <div>
    <label>Quantity: </label>
      <input [(ngModel)]="product.quantity" placeholder="amount"/>
    </div>
    <p>
      <button (click)="orderProducts()">Order</button>
    </p>
  </div>
  `
})
export class ProductDetailComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.productService.getProduct(+params['id']))
      .subscribe((product: Product) => this.product = product);
  }

  orderProducts() {
    let productId = this.product ? this.product.id : null;
    this.router.navigate(['/cart',productId]/*, {skipLocationChange:true}*/);
  }
}
