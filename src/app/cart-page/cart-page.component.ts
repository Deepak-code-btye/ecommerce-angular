import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  carData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      this.carData = res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item?.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      console.log(this.priceSummary);
    });
  }
}
