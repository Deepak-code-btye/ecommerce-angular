import { Component, OnInit } from '@angular/core';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  propularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.popularProduct().subscribe((res) => {
      // console.warn(res);
      this.propularProducts = res;
    });

    // trendy api
    this.product.trendyproduct().subscribe((res) => {
      console.warn(res);
    });
  }
}
