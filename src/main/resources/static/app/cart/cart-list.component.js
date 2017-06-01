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
// TODO SOMEDAY: Feature Componetized like CrisisCenter
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("../product/product.service");
var cart_service_1 = require("./cart.service");
var CartComponent = (function () {
    function CartComponent(productService, route, router, cartService) {
        this.productService = productService;
        this.route = route;
        this.router = router;
        this.cartService = cartService;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        var cd = new cart_service_1.CartDetail();
        this.route.params
            .switchMap(function (params) { return _this.productService.getProduct(+params['id']); })
            .subscribe(function (product) { return _this.product = product; });
        cd.quantity = this.product.quantity;
        cd.productId = this.product.id;
        cd.price = this.product.price;
        this.cartService.updateCart(this.cartId, JSON.stringify(cd))
            .subscribe(function (cart) {
            _this.cart = cart;
            console.log("cart RECEIVED: " + cart);
        }, function (err) {
            _this.handleError(err);
            console.log("ERROR: " + err);
        }, function () {
            console.log("cart COMPLETED");
        });
    };
    CartComponent.prototype.gotoProduct = function () {
        var productId = this.product ? this.product.id : null;
        this.router.navigate(['/'] /*, {skipLocationChange:true}*/);
    };
    CartComponent.prototype.checkout = function () {
        this.cartService.checkout("" + this.cart.id).subscribe();
        this.router.navigate(['/'] /*, {skipLocationChange:true}*/);
    };
    CartComponent.prototype.handleError = function (error) {
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
    };
    return CartComponent;
}());
CartComponent = __decorate([
    core_1.Component({
        template: "\n  \n   <div *ngIf=\"cart\">\n    <h3><label>cart Id:</label>{{ cart.id }}<label>Order Date:</label>{{cart.orderDate}}<label>Session Id</label>{{cart.sessionId}}</h3>\n  <table>\n  <tr>\n    <th>id</th>\n    <th>quantity</th>\n    <th>price</th>\n    <th>product name</th>\n  </tr>\n    <tr class=\"items\" *ngFor=\"let cartDetail of cart.cartDetails\">\n        <td><span class=\"badge\">{{cartDetail.id}}</span></td>\n        <td>{{ cartDetail.quantity }}</td>\n        <td>{{ cartDetail.price }}</td>\n    </tr>\n  </table>\n    <p>\n      <button (click)=\"checkout()\">Check out</button>\n      <button (click)=\"gotoProduct()\">Continue Shopping</button>\n    </p>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router,
        cart_service_1.CartService])
], CartComponent);
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart-list.component.js.map