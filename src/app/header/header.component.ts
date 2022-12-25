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
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = 'default';
          // console.warn('outside seller area');
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
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
}
