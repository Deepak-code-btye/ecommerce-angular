import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // search box func
  menuType: string = 'default';
  // seller name
  sellerName: string = '';

  SearchResult: undefined | product[];
  // user name
  userName: string = '';

  // cartItem
  cartItem = 0;
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn('in seller area')
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
          // user
        } else if (localStorage.getItem('User')) {
          let userStore = localStorage.getItem('User');
          let userData = userStore && JSON.parse(userStore);
          // console.warn(userData.name);
          this.userName = userData.name;
          this.menuType = 'User';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
      let localCartData = localStorage.getItem('localCart');
      if (localCartData) {
        this.cartItem = JSON.parse(localCartData).length;
      }
      // without refersh due to cart auto number in the change
      this.product.cartData.subscribe((res) => {
        this.cartItem = res.length;
      });
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  // userlogout
  userlogout() {
    localStorage.removeItem('User');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  //  searching box function
  Searchproduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.warn(element.value);
      this.product.searchproduct(element.value).subscribe((res) => {
        // console.warn(res);
        // product data view maximum 5
        if (res.length > 5) {
          res.length = 5;
        }
        this.SearchResult = res;
      });
    }
  }
  hideSearch() {
    this.SearchResult = undefined;
  }

  // Searching btn function
  SearchBtn(val: string) {
    // console.warn(val);
    this.route.navigate([`/search/${val}`]);
  }
  //  search data to click fun
  redirectToDetails(id: number) {
    this.route.navigate([`/details/${id}`]);
  }
}
