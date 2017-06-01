"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/operator/delay");
require("rxjs/operator/mergeMap");
require("rxjs/operator/switchMap");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var Product = (function () {
    function Product(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    return Product;
}());
exports.Product = Product;
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ProductService.prototype.getProducts = function () {
        var _this = this;
        if (this.products) {
            return Observable_1.Observable.of(this.products);
        }
        else {
            return this.http.get('http://localhost:8081/product')
                .map(function (response) { return response.json(); })
                .do(function (products) {
                _this.products = products;
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
        }
        ;
    };
    ProductService.prototype.getProduct = function (id) {
        return Observable_1.Observable.of(this.products.find(function (product) { return product.id == id; }));
    };
    ProductService.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map