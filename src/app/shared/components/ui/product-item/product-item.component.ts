import { Product } from './../../../interfaces/product';
import { Component, Input } from '@angular/core';
//import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

 @Input() product!: Product;


  //product = input.required<Product>()

}
