import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


export class Product {
  constructor(public id: number, public name: string, public price: string, public quantity: string) { }
}


@Injectable()
export class ProductService {
  headers = new Headers({'Content-Type': 'application/json'});
  public products: Product[];

  constructor(private http: Http) { 
  }

  getProducts() {
    if(this.products) {
      return Observable.of(this.products);
    } 
    else {
      return this.http.get('http://localhost:8081/product')
                  .map(response => response.json())
                  .do(products => {
                    this.products = products;
                  });
                  /*.subscribe(
      (res: Response) => {
           console.log("VALUE RECEIVED: "+res);
       },
       (err: Error) => {
            console.log("ERROR: "+err);
       },
       () => {
            console.log("COMPLETED");
       });*/
      /*
      return 
      this.http.get('http://localhost:8081/product/all')
      .map((res: Response) => res.json())
      .subscribe(
      (res: Response) => {
           console.log("VALUE RECEIVED: "+res);
       },
       (err: Error) => {
            console.log("ERROR: "+err);
       },
       () => {
            console.log("COMPLETED");
       });*/
      /*return this.http.get('http://localhost:8081/product/all')
                  .map(response => <Product[]> response.json().products)
                  .do(products => {
                    console.log(products);
                    this.products = products;
                  })
                  .catch(this.handleError);*/
    };
  }

  getProduct(id: number | string) {
      return Observable.of(this.products.find(product => product.id == id));
  }
  private handleError (error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Promise.reject(error.message || error.json().error || 'Server error');
  }
}
