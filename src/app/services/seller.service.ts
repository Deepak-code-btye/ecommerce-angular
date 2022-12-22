import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from 'src/data.type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggeding = new BehaviorSubject<boolean>(false);
  islogginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((res) => {
        this.isSellerLoggeding.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['/seller-home']);
        // console.warn('servie call', res);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggeding.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
  // seller verify function
  userLogin(data: login) {
    // console.warn(data);
    this.http
      .get(
        `http://localhost:3000/seller?=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((res: any) => {
        this.isSellerLoggeding.next(true);
        console.warn('servie call', res);
        if (res && res.body && res.body.length) {
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['/seller-home']);
          // console.warn('user logged in');
        } else {
          this.islogginError.emit(true);
          console.warn('user login failed');
        }
      });
  }
}
