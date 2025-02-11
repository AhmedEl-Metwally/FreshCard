import { Product } from './../../../../../shared/interfaces/product';
import { ProductService } from './../../../../../shared/services/product/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {

  Products! : Product[]

  private readonly _productService = inject(ProductService)
  

  ngOnInit(): void{
    this.getproducts()
  }

  getproducts() {
    this._productService.getproducts().subscribe({
      next :(res) => {
        console.log(res);
        this.Products = res.data
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log("complete");
      }
    })
  }

}
