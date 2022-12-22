import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { SignUp } from 'src/data.type';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }
  userSignUp(data: SignUp) {

    return this.http.post('http://localhost:3000/seller', data)
    // console.warn('servie call');

  }
}
