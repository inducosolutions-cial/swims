import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated:Boolean = true;
  tokenVal = "fasdfas"
  constructor() {


   }
  getAuthStatus():Boolean{
    return this.isAuthenticated;
  }
  getToken(){
    return this.tokenVal;
  }
}
