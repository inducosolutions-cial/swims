import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAuthenticated: Boolean = false;
  tokenVal = 'fasdfas';
  constructor() {}
  getAuthStatus(): Boolean {
    return this.isAuthenticated;
  }
  getToken() {
    return this.tokenVal;
  }
}
