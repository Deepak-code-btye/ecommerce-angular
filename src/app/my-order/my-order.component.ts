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
    this.product.orderList().subscribe((res) => {
      // console.log(res);
      this.orderData = res;
      // console.log(this.orderData)
    });
  }
}
