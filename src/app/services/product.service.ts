import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { cart, product } from 'src/data.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  addproduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
    // console.warn('service call');
  }
  productList() {
    // type of product Data
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProductId(id: string) {
    // type of product Data
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  productUpdate(product: product) {
    return this.http.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  // carousel
  popularProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4');
  }
  trendyproduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchproduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  //  search component
  // searchData() {}

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      // console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToCartData(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
      });
  }
}
