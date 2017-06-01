// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product, ProductService}  from '../product/product.service';
import {CartService, Cart, CartDetail} from './cart.service';


@Component({
  template: `
  
   <div *ngIf="cart">
    <h3><label>cart Id:</label>{{ cart.id }}<label>Order Date:</label>{{cart.orderDate}}<label>Session Id</label>{{cart.sessionId}}</h3>
  <table>
  <tr>
    <th>id</th>
    <th>quantity</th>
    <th>price</th>
    <th>product name</th>
  </tr>
    <tr class="items" *ngFor="let cartDetail of cart.cartDetails">
        <td><span class="badge">{{cartDetail.id}}</span></td>
        <td>{{ cartDetail.quantity }}</td>
        <td>{{ cartDetail.price }}</td>
    </tr>
  </table>
    <p>
      <button (click)="checkout()">Check out</button>
      <button (click)="gotoProduct()">Continue Shopping</button>
    </p>
    </div>
  `
})
export class CartComponent implements OnInit {

  //observableCart: Observable<Cart>;
  //cartObserver: Observer<Cart>;
  //cart: Cart;
  cart: Cart;
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
    var cd = new CartDetail();

    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.productService.getProduct(+params['id']))
      .subscribe((product: Product) => this.product = product);
    cd.quantity = this.product.quantity;
    cd.productId = this.product.id;
    cd.price = this.product.price;

this.cartService.updateCart(this.cartId,JSON.stringify(cd))
      .subscribe(
      (cart: Cart) => {
        this.cart = cart;
           console.log("cart RECEIVED: "+cart);
           
       },
       (err: Error) => {
         this.handleError(err);
            console.log("ERROR: "+err);
       },
       () => {

            console.log("cart COMPLETED");
       });

  }
  gotoProduct() {
    let productId = this.product ? this.product.id : null;
    this.router.navigate(['/']/*, {skipLocationChange:true}*/);
  }

  checkout() {
    this.cartService.checkout(""+this.cart.id).subscribe();

    this.router.navigate(['/']/*, {skipLocationChange:true}*/);
  }
   private handleError (error: any) {
       let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead

  }

//  isSelected(product: Product) { return product.id == this.selectedId; }
/*
  onSelect(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
  */
}
