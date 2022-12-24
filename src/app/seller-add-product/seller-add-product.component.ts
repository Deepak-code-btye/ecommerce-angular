import { Component, OnInit } from '@angular/core';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  productMsg: string | undefined;
  constructor(private product: ProductService) {}
  ngOnInit(): void {}
  submit(data: product) {
    this.product.addproduct(data).subscribe((res) => {
      console.warn(res);
      if (res) {
        this.productMsg = 'product add successfully added';
      }
      setTimeout(() => {
        this.productMsg = undefined;
      }, 1000);
    });
  }
  // console.warn(data);
}
