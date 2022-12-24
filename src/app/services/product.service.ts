import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { product } from 'src/data.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  addproduct(data: product) {
    return this.http.post('http://localhost:3000/product', data);
    // console.warn('service call');
  }
}
