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
var ProductListComponent = (function () {
    function ProductListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.products = this.route.params
            .switchMap(function (params) {
            _this.selectedId = +params['id'];
            return _this.service.getProducts();
        });
    };
    ProductListComponent.prototype.isSelected = function (product) { return product.id == this.selectedId; };
    ProductListComponent.prototype.onSelect = function (product) {
        this.router.navigate(['/product', product.id] /*, {skipLocationChange:true}*/);
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        template: "\n\n  <table>\n  <tr>\n    <th>id</th>\n    <th>name</th>\n    <th>price</th>\n    <th>inventory</th>\n    <th>order</th>\n  </tr>\n    <tr class=\"items\" *ngFor=\"let product of products | async\">\n        <td><span class=\"badge\">{{ product.id }}</span></td>\n        <td>{{ product.name }}</td>\n        <td>{{ product.price }}</td>\n        <td>{{ product.quantity }}</td>\n        <td><button (click)=\"onSelect(product)\">Order Now</button></td>\n    </tr>\n  </table>\n  "
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map