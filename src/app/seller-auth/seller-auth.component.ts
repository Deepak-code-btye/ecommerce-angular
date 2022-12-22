import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from 'src/data.type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = false;
  authError: string = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  SignUp(data: SignUp): void {
    // console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: SignUp) {
    // console.warn(data);
    //  user login
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.islogginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'email or password is not correct';
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
