import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit
{

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _orderService = inject(OrderService)

  checkOutForm!: FormGroup
  cartId! : string

  ngOnInit()
  {
    this.getCartId()
    this.initForm()
  }

  getCartId()
  {
    this.cartId = this._activatedRoute.snapshot.params['cartId']
  }

  initForm()
  {
    this.checkOutForm = new FormGroup
      ({
        details: new FormControl( '', [Validators.required] ),
        city: new FormControl( '', [Validators.required] ),
        phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]  ),
      })
  }

  completeOrder()
  {
    console.log(this.cartId);
    
    this._orderService.onLinePayment(this.cartId, this.checkOutForm.value).subscribe
      ({
        next: (res) =>
        {
          console.log(res);
          open(res.session.url)
        }
      })
    // this._orderService.cashOrder(this.cardId, this.checkOutForm.value).subscribe
    //   ({
    //     next: (res) => {
    //       console.log(res);
          
    //     }
    //   })
  }

}
