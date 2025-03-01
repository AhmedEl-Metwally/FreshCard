import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/interfaces/order';
import { Modal } from 'flowbite';


@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit , AfterViewInit {

  private readonly _authService = inject(AuthService)
  private readonly _orderService = inject(OrderService)

  @ViewChild('items') items!: ElementRef;
  
  options: any =
    {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

   instanceOptions = {
     id: 'default-modal',
    override: true
  };


  allOrders: Order[] = []
  modal!: Modal;
  selectedOrder: Order | null = null;


  ngOnInit(): void {
    this.getUserId()
  }

  getUserId()
  {
    this._authService.userDate.subscribe
      ({
        next: (res) => {
          console.log(res);
          res.id && this.getAllOrder(res.id)
        }
      })
  }

  getAllOrder(id:string)
  {
    this._orderService.getUserOrders(id).subscribe
      ({
        next: (res) => {
          console.log(res); 
          this.allOrders = res
        }
      })
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.items.nativeElement, this.options, this.instanceOptions);
      
  }

  openModel(index: number)
  {
    // let ele = this.items.nativeElement as HTMLElement
    // const modal = new Modal(ele, this.options, this.instanceOptions);
    // modal.show()
    this.selectedOrder = this.allOrders[index];
    this.modal.show();
  }

  closeModal(): void {
    this.modal.hide();
  }

}
