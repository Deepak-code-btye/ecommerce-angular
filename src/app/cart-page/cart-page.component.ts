import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private route: Router) {}
  ngOnInit(): void {
    this.loadDetails();
  }
  loadDetails() {
    this.product.currentCart().subscribe((res) => {
      this.cartData = res;
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
      // console.log(this.priceSummary);
      if (!this.cartData.length) {
        this.route.navigate(['/']);
      }
    });
  }
  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }
  checkout() {
    this.route.navigate(['/checkout']);
  }
}
