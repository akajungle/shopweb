import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product, ProductService}  from './product/product.service';
import {CartService, Cart, CartDetail} from './cart/cart.service';

@Component({
    selector: 'shop',
    template: `
   <table>
    <tr class="items">
        <td>Welcome!</td>
        <td><button (click)="getCart()">Shopping Cart</button></td>
        <td>{{numberOfItems}}</td>
    </tr> 
  </table>
    <router-outlet></router-outlet>
  `
})
export class ShopComponent implements OnInit {
  cart: Cart;
  observableCart: Observable<Cart>;
  numberOfItems: number;
  private error: boolean;
  private finished: boolean;
  private cartId: number;
  private productId:number;
  private product:Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,

  ) {}

  ngOnInit() {
    return this.cartService.getCart().do (cart=>{this.cart = cart});
  }
   private handleError (error: any) {
       let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead

  }
  getCart() {
    this.observableCart = this.cartService.getCart();
    this.router.navigate(['/cart',this.cart.id]/*, {skipLocationChange:true}*/);
    
  }
}