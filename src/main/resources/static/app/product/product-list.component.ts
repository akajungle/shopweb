import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Product, ProductService}  from './product.service';

@Component({
  template: `

  <table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>price</th>
    <th>inventory</th>
    <th>order</th>
  </tr>
    <tr class="items" *ngFor="let product of products | async">
        <td><span class="badge">{{ product.id }}</span></td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.quantity }}</td>
        <td><button (click)="onSelect(product)">Order Now</button></td>
    </tr>
  </table>
  `
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  private selectedId: number;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getProducts();
      });
  }

  isSelected(product: Product) { return product.id == this.selectedId; }

  onSelect(product: Product) {
    this.router.navigate(['/product',product.id]/*, {skipLocationChange:true}*/);
  }
}
