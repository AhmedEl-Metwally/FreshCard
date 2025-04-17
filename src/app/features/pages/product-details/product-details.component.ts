import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-product-details',
  imports: [ProductItemComponent, CarouselModule ],
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
  recentProduct!: Product[]
  productImages: string[] = [];
  selectedImage: string = '';


  thumbOptions: OwlOptions = {
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 3 },
      600: { items: 4 },
      1000: { items: 5 }
    }
  };

  selectImage(img: string) {
    this.selectedImage = img;
  }

  

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
          this.productImages = [
            res.data.imageCover,
            ...(res.data.images || [])
          ];
          this.selectedImage = this.productImages[0];
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

