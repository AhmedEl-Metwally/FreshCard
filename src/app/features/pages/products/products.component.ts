import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
   private readonly _toastrService = inject(ToastrService)

   Products! : Product[]

  ngOnInit(): void {
    this.getproducts()
  }

  getproducts() {
    this._productService.getproducts().subscribe({
      next: (res) => {
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

  addToCard(id: string) {
    this._cartService.addProductToCard(id).subscribe
      ({
        next: (res) => {
          console.log(res);
          this._toastrService.success(res.message, 'Hii');
        }
      })
  }
}
