import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartDetails!: Cart
  isLoading: boolean = false
  emptyCart:boolean = false
  private readonly _cartService = inject(CartService)


  ngOnInit(): void {
    this.getCart()
  }

  getCart()
  {
    this.isLoading = true
    this._cartService.getCard().subscribe
      ({
        next: (res) => {
          console.log(res);
          this.cartDetails = res
          this.isLoading = false
        }
      })
  }

  removeItem(id: string)
  {
    this.isLoading = true
    this._cartService.removeSpecificIItem(id).subscribe
      ({
        next: (res) => {
          console.log(res);
          this.cartDetails = res
          this.isLoading = false
        }
      })
  }



  updateCount(id: string, count: number): void {
    if (count < 1) return; 
    console.log('Product ID:', id);
    console.log('New Count:', count);
    this._cartService.updateProductQuantity(id, `${count}`).subscribe({
      next: (res) => {
        console.log( res);
        const updatedProduct = this.cartDetails.data.products.find(
          (p) => p.product._id === id
        );
        if (updatedProduct) {
          updatedProduct.count = count; 
        }
      },
    });
  }



  clearCart()
  {
    this.isLoading = true
    this._cartService.clearCart().subscribe
      ({
        next: (res) => {
          console.log(res);
          if (res.message == "success")
          {
            this.cartDetails = {} as Cart
            this.emptyCart = true
          }
        }
      })
  }

}
