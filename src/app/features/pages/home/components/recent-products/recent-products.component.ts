import { Product } from './../../../../../shared/interfaces/product';
import { ProductService } from './../../../../../shared/services/product/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {

  Products! : Product[]

  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toastrService = inject(ToastrService)

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

  addToCard(id:string)
  {
    this._cartService.addProductToCard(id).subscribe
      ({
        next: (res) => {
          console.log(res);
          this._toastrService.success(res.message, 'Hii');
        }
      })
  }

}
