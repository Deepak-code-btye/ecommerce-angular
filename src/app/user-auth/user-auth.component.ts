import { Component, OnInit } from '@angular/core';
import { SignUp } from 'src/data.type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService) {}
  ngOnInit(): void {
    // redirect function
    this.user.userAuthReload();
  }
  SignUp(data: SignUp) {
    // console.warn(data);
    this.user.userSignUp(data);
  }
}
