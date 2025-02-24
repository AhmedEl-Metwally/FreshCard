import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductService)

  productDeatials : Product = {} as Product

  ngOnInit(): void {
      this.getId()
  }

  getId()
  {
    this._activatedRoute.paramMap.subscribe
      ({
        next: (params) => {
          const id = params.get('id')
          if (id)
          {
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
      }
    })
  }

}
