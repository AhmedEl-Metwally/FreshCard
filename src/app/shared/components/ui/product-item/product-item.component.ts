import { RouterLink } from '@angular/router';
import { Product } from './../../../interfaces/product';
import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  isLoading: boolean = false
  @Input() product!: Product;
  @Output() fireAddToCart : EventEmitter<string> = new EventEmitter()


  //product = input.required<Product>()

  handAddToCart(id:string)
  {
    this.isLoading = true
    this.fireAddToCart.emit(id)
    this.isLoading = true
  }

}
