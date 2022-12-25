import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuntity: number = 1;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productFind = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(productFind);
    productFind &&
      this.product.getProductId(productFind).subscribe((res) => {
        // console.warn(res);
        this.productData = res;
      });
  }
  handleQuntity(val: string) {
    if (this.productQuntity < 20 && val === 'plus') {
      this.productQuntity += 1;
    } else if (this.productQuntity > 1 && val === 'sub') {
      this.productQuntity -= 1;
    }
  }
}
