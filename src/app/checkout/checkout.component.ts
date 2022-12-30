import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private route: Router) {}
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0;
      this.cartData = res;
      res.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item?.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      // console.log(this.totalPrice);
    });
  }
  orderNow(data: { email: string; address: string; contact: string }) {
    // console.warn(data);
    let user = localStorage.getItem('User');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };
      // remove cart data
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItem(item.id);
        }, 1);
      });
      this.product.orderNow(orderData).subscribe((res) => {
        if (res) {
          // alert('order placed');
          this.orderMsg = 'Your order has been placed';
          (async () => {
            const users = await this.route.navigate(['/my-order']);
            this.orderMsg = undefined;
            return users;
          })();
        }
      });
    }
  }
}
