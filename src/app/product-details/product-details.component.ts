import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productFindId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(productFindId);
    productFindId &&
      this.product.getProductId(productFindId).subscribe((res) => {
        // console.warn(res);
        this.productData = res;

        //remove cart fun
        let cartData = localStorage.getItem('localCart');
        if (productFindId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productFindId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('User');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((res) => {
            let items = res.filter(
              (item: product) =>
                productFindId?.toString() === item.productId?.toString()
            );
            if (items.length) {
              this.removeCart = true;
            }
          });
        }
      });
  }
  handleQuntity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'sub') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('User')) {
        // console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      // user-with AddToCart
      else {
        let user = localStorage.getItem('User');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        // console.warn(cartData);
        this.product.AddToCartData(cartData).subscribe((res) => {
          if (res) {
            // alert('product is added');
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  RemoveToCart(productId: number) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
