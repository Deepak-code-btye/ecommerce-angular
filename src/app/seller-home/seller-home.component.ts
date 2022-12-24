import { Component, OnInit } from '@angular/core';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  deleteIcon = faTrash;
  editIcon = faEdit;
  pruductList: undefined | product[];
  pruductListMsg: undefined | string;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.List();
  }
  List() {
    this.product.productList().subscribe((res) => {
      console.log(res);
      this.pruductList = res;
    });
  }
  productDelete(id: number) {
    console.warn('deleted product', id);
    this.product.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.pruductListMsg = 'Product is deleted';
        // auto update Component
        this.List();
      }
    });
  }
}
