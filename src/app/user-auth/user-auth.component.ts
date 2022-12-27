import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from 'src/data.type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  userAuthError: string = '';
  constructor(private user: UserService, private product: ProductService) {}
  ngOnInit(): void {
    // redirect function
    this.user.userAuthReload();
  }
  SignUp(data: SignUp) {
    // console.warn(data);
    this.user.userSignUp(data);
  }
  Login(data: login) {
    // this.userAuthError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      // console.warn(isError);

      if (isError) {
        this.userAuthError = 'email or password is not correct';
      } else this.localCartToRemoteCart();
    });
  }
  UseropenLogin() {
    this.showLogin = true;
  }
  UseropenSignUp() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('User');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;

        setTimeout(() => {
          this.product.AddToCartData(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
