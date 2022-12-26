import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/data.type';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
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
      this.route.navigate(['/']);
    }
  }
}
