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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("./product.service");
var cart_service_1 = require("../cart/cart.service");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(route, router, productService, cartService) {
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.cartService = cartService;
        //@HostBinding('@routeAnimation') routeAnimation = true;
        this.display = 'block';
        this.position = 'absolute';
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.productService.getProduct(+params['id']); })
            .subscribe(function (product) { return _this.product = product; });
    };
    ProductDetailComponent.prototype.orderProducts = function () {
        var productId = this.product ? this.product.id : null;
        this.router.navigate(['/cart', productId] /*, {skipLocationChange:true}*/);
    };
    return ProductDetailComponent;
}());
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], ProductDetailComponent.prototype, "display", void 0);
__decorate([
    core_1.HostBinding('style.position'),
    __metadata("design:type", Object)
], ProductDetailComponent.prototype, "position", void 0);
ProductDetailComponent = __decorate([
    core_1.Component({
        template: "\n  <h2>PRODUCTS</h2>\n  <div *ngIf=\"product\">\n    <h3>\"{{ product.name }}\"</h3>\n    <div>\n      <label>Id: </label>{{ product.id }}</div>\n    <div>\n      <label>Name: </label>{{product.name}}</div>\n    <div>\n      <label>Price: </label>{{product.price}}</div>\n    <div>\n    <div>\n      <label>Inventory: </label>{{product.quantity}}</div>\n    <div>\n    <label>Quantity: </label>\n      <input [(ngModel)]=\"product.quantity\" placeholder=\"amount\"/>\n    </div>\n    <p>\n      <button (click)=\"orderProducts()\">Order</button>\n    </p>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        product_service_1.ProductService,
        cart_service_1.CartService])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map