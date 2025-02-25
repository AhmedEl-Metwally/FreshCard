import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  imports: [ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  isLoading:boolean = false
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toastrService = inject(ToastrService)

  productDeatials: Product = {} as Product
  recentProduct! : Product[]

  ngOnInit(): void
  {
      this.getId()
  }

  getId()
  {
    this._activatedRoute.paramMap.subscribe
      ({
        next: (params) => {
          const id = params.get('id')
          if (id) {
            this.getDetails(id);
          }
        }
      })
  }

  getDetails(id: string)
  {
    this._productService.getproductById(id).subscribe
      ({
        next: (res) => {
          this.productDeatials = res.data
          this.getRelatedProducts(this.productDeatials.category._id)
        },
        error: (err) => console.error('Error loading product:', err),
    })
  }


  getRelatedProducts(categoryId: string) {
    this._productService.getproducts(categoryId).subscribe
      ({
      next: (res) => {
        console.log(res);
        this.recentProduct = res.data;
      },
      error: (err) => console.error('Error loading related products:', err),
    });
  }

  addToCart(id: string)
  {
    this.isLoading = true
    this._cartService.addProductToCard(id).subscribe
      ({
        next:(res) => {
          console.log(res);
          this.isLoading = false
          this._toastrService.success(res.message, 'Hii');
        }
      })
  }


}

