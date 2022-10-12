import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  public isResetPasswordView: boolean = false;
  public resetPasswordToken: any = '';
  public isAuthenticated = false;
  public currentToken: any = null;
  public username = 'Ashok Alluri';
  public name = 'Ashok Alluri';
  public role_id = 0;
  public corporate_code: any;
  public user_id: any;
  constructor() { }
}
