import { Component, OnInit } from '@angular/core';
import { order } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.getOrderList();
  }
  CancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.getOrderList();
        }
      });
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
