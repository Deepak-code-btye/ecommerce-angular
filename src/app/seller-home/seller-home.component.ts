import { Component, OnInit } from '@angular/core';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  pruductList: undefined | product[];
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.productList().subscribe((res) => {
      console.log(res);
      this.pruductList = res;
    });
  }
  productDelete(id: number) {
    console.warn('deleted product', id);
  }
}
