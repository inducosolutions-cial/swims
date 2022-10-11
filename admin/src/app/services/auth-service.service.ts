import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
<<<<<<< HEAD
  isAuthenticated:Boolean = true;
  tokenVal = "fasdfas"
  constructor() {


  }
  getAuthStatus():Boolean{
=======
  isAuthenticated: Boolean = false;
  tokenVal = 'fasdfas';
  constructor() {}
  getAuthStatus(): Boolean {
>>>>>>> 91e470385302d9e13ac7cba6f684c2b7b8c425b3
    return this.isAuthenticated;
  }
  getToken() {
    return this.tokenVal;
  }
}
