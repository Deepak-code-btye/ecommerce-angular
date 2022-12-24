import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-upadate-product',
  templateUrl: './seller-upadate-product.component.html',
  styleUrls: ['./seller-upadate-product.component.css'],
})
export class SellerUpadateProductComponent implements OnInit {
  productMsg: undefined | string;
  productData: undefined | product;
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProductId(productId).subscribe((res) => {
        console.warn(res);
        this.productData = res;
      });
  }
  updateData(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.productUpdate(data).subscribe((res) => {
      // console.warn(res);

      if (res) {
        this.productMsg = 'Product data has been updated';
      }
      setTimeout(() => {
        this.productMsg = undefined;
      }, 1000);
    });
  }
}
