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
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
require("rxjs/add/operator/map");
require("rxjs/operator/delay");
require("rxjs/operator/mergeMap");
require("rxjs/operator/switchMap");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var Cart = (function () {
    function Cart() {
    }
    Cart.prototype.find = function (id) {
        var i = 0;
        var len = this.cartDetails.length;
        for (i = 0; i < len; i++) {
            if (id == this.cartDetails[i].id) {
                return i;
            }
        }
        return -1;
    };
    return Cart;
}());
exports.Cart = Cart;
var CartDetail = (function () {
    function CartDetail() {
    }
    return CartDetail;
}());
exports.CartDetail = CartDetail;
var CartService = (function () {
    function CartService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
    }
    CartService.prototype.getCartId = function (cartId) {
        if (this.cart)
            return this.cart.id;
        if (cartId == -1) {
            var cookieId = this._cookieService.get('cartId');
            if (cookieId == null)
                return -1;
            return +cookieId;
        }
        return cartId;
    };
    CartService.prototype.updateCart = function (cartId, detail) {
        var _this = this;
        if (cartId === void 0) { cartId = -1; }
        /*let headers = new Headers({ 'Accept': 'application/json' });
         headers.append('Content-Type', 'application/json');*/
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8082/cart' + ((cartId == -1) ? '' : ('/cartId=' + cartId)), '[' + detail + ']', options)
            .map(function (response) { return response.json(); })
            .do(function (cart) {
            _this.cart = cart;
            _this.setCookie('cartId', '' + _this.cart.id);
            _this.cart.cartDetails.forEach(function (cd) {
                _this.getProduct(cd.productId)
                    .do(function (p) {
                    console.log("find @@@@@@@" + p.name + p.id);
                    cd.product = p;
                });
            });
        });
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
    };
    CartService.prototype.setCookie = function (name, value) {
        var d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000); //1 day expire
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; ";
    };
    CartService.prototype.checkout = function (cartId) {
        var param = new URLSearchParams();
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (this.cart) {
            param.append('cartId', cartId);
            return this.http.post('http://localhost:8082/checkout?' + param.toString(), headers); //can't make put pass 403, use post instead
        }
        else {
            param.append('cartId', this._cookieService.get('cartId'));
            return this.http.post('http://localhost:8082/checkout?' + param.toString(), headers);
        }
    };
    CartService.prototype.getCart = function (cartId) {
        var _this = this;
        if (cartId === void 0) { cartId = -1; }
        //let headers = new Headers({ 'Accept': 'application/json' });
        var sCartId = this.getCartId(cartId);
        if (sCartId == -1) {
            return null;
        }
        if (this.cart) {
            return Observable_1.Observable.of(this.cart);
        }
        return this.http.get('http://localhost:8082/cart/' + sCartId)
            .map(function (response) { return response.json(); })
            .do(function (cart) {
            _this.cart = cart;
        });
    };
    CartService.prototype.getProduct = function (productId) {
        return this.http.get('http://localhost:8081/product/' + productId)
            .map(function (response) { return response.json(); });
    };
    CartService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return CartService;
}());
CartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, cookies_service_1.CookieService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map