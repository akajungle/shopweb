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
var router_1 = require("@angular/router");
var product_service_1 = require("./product/product.service");
var cart_service_1 = require("./cart/cart.service");
var ShopComponent = (function () {
    function ShopComponent(productService, route, router, cartService) {
        this.productService = productService;
        this.route = route;
        this.router = router;
        this.cartService = cartService;
    }
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        return this.cartService.getCart().do(function (cart) { _this.cart = cart; });
    };
    ShopComponent.prototype.handleError = function (error) {
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
    };
    ShopComponent.prototype.getCart = function () {
        this.observableCart = this.cartService.getCart();
        this.router.navigate(['/cart', this.cart.id] /*, {skipLocationChange:true}*/);
    };
    return ShopComponent;
}());
ShopComponent = __decorate([
    core_1.Component({
        selector: 'shop',
        template: "\n   <table>\n    <tr class=\"items\">\n        <td>Welcome!</td>\n        <td><button (click)=\"getCart()\">Shopping Cart</button></td>\n        <td>{{numberOfItems}}</td>\n    </tr> \n  </table>\n    <router-outlet></router-outlet>\n  "
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router,
        cart_service_1.CartService])
], ShopComponent);
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map