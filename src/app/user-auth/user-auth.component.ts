import { Component, OnInit } from '@angular/core';
import { login, SignUp } from 'src/data.type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  userAuthError: string = '';
  constructor(private user: UserService) {}
  ngOnInit(): void {
    // redirect function
    this.user.userAuthReload();
  }
  SignUp(data: SignUp) {
    // console.warn(data);
    this.user.userSignUp(data);
  }
  Login(data: login) {
    // this.userAuthError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      // console.warn(isError);

      if (isError) {
        this.userAuthError = 'email or password is not correct';
      }
    });
  }
  UseropenLogin() {
    this.showLogin = true;
  }
  UseropenSignUp() {
    this.showLogin = false;
  }
}
