import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from 'src/data.type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router:Router) {
  }

  ngOnInit(): void {

  }
  SignUp(data: SignUp): void {
    // console.warn(data);
    this.seller.userSignUp(data).subscribe((res) => {
      if (res) {
      this.router.navigate(['/seller-home'])
    }
      console.warn(res);

    })

  }

}
