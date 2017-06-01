import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Product, ProductService}  from '../product/product.service';

export class Cart {
  public id: number;
  public orderDate: Date ;
  public sessionId: number;
  public cartDetails: CartDetail[];

  constructor() { }

  find(id:number) {
  var i = 0;
  var len = this.cartDetails.length;
  for (i = 0; i < len; i++) {
    if (id == this.cartDetails[i].id) {
      return i;
    }
  }
  return -1;
}
}
export class CartDetail {
  public id: number;
  public productId: number;
  public quantity: string;
  public price: string;
  public product: Product;
}


@Injectable()
export class CartService {

  cart: Cart;

  constructor(private http: Http, private _cookieService:CookieService) { 
    
     
  }


  private getCartId(cartId: number) {
    if (this.cart)
      return this.cart.id;
    if (cartId == -1) {//get cookie
      var cookieId = this._cookieService.get('cartId');
      if (cookieId==null) //cookie doesn't exist
          return -1;
      return +cookieId;
    }
    return cartId;
  }
  updateCart(cartId:number=-1, detail:String) {
    /*let headers = new Headers({ 'Accept': 'application/json' });
     headers.append('Content-Type', 'application/json');*/
     let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
    
  

  return  this.http.post('http://localhost:8082/cart'+((cartId==-1)?'':('/cartId='+cartId)), '['+detail+']', options)
    .map(response => response.json())
                      .do(cart => {
                    this.cart = cart;
                    this.setCookie('cartId', ''+this.cart.id);
                    this.cart.cartDetails.forEach(cd=> {
            this.getProduct(cd.productId)
            .do((p:Product)=> {
              console.log("find @@@@@@@"+p.name+p.id); 
              cd.product = p;})

                    })});
        
                /*  .do(cart => {
        this.cart = cart;
        
           console.log("VALUE RECEIVED: "+cart);
                  });
    .map((cart => Cart {
        this.cart = cart;
        this.setCookie('cartId', ''+this.cart.id);
           console.log("VALUE RECEIVED: "+cart);
           return cart;

    })
     .catch(this.handleError);
                */
/*
      .subscribe(
      (cart: Cart) => {
        this.cart = cart;
        this.setCookie('cartId', ''+this.cart.id);
           console.log("VALUE RECEIVED: "+cart);
           
       },
       (err: Error) => {
         this.handleError(err);
            console.log("ERROR: "+err);
       },
       () => {
            console.log("COMPLETED");

         return this.cart;
       });
       return this.cart;*/
  }

private setCookie(name: string, value: string) {
        var d:Date = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); //1 day expire
        let expires:string = `expires=${d.toUTCString()}`;
        document.cookie = name + "=" + value + "; ";
    }

  checkout(cartId: string) {
    let param = new URLSearchParams();

         let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
    if (this.cart) {
      param.append('cartId', cartId);
      return this.http.post('http://localhost:8082/checkout?'+param.toString(),   headers);//can't make put pass 403, use post instead
    }
    else {
      param.append('cartId', this._cookieService.get('cartId'));
      return this.http.post('http://localhost:8082/checkout?'+param.toString(),  headers);
    }
  }

  getCart(cartId : number=-1) {
    //let headers = new Headers({ 'Accept': 'application/json' });
    var sCartId = this.getCartId(cartId);
    if (sCartId==-1) {
      return null;
    }
    if(this.cart) {
      return Observable.of(this.cart);
    } 
   return this.http.get('http://localhost:8082/cart/'+sCartId)
                  .map(response => response.json())
                  .do(cart => {
                    this.cart = cart;
                  });
  }

  getProduct(productId: number | string) {
     return this.http.get('http://localhost:8081/product/'+productId)
                  .map(response => response.json());
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
