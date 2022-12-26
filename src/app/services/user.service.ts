import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  isUserLogin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit(): void {}
  userSignUp(data: SignUp) {
    // console.warn(user);
    this.http
      .post('  http://localhost:3000/users', data, {
        observe: 'response',
      })
      .subscribe((res) => {
        // console.warn(res);
        if (res) {
          localStorage.setItem('User', JSON.stringify(res.body));
          this.route.navigate(['/']);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('User')) {
      this.isUserLogin.next(true);
      this.route.navigate(['/']);
    }
  }
  userLogin(data: login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((res) => {
        this.isUserLogin.next(true);

        if (res && res.body?.length) {
          this.isLoginError.emit(false);
          localStorage.setItem('User', JSON.stringify(res.body[0]));
          this.route.navigate(['/']);
        } else {
          this.isLoginError.emit(true);
          console.warn('user login failed');
        }
      });
  }
}
