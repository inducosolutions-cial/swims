import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppDataService } from './app-data.service';
const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', '*/*')
  .set('responseType', 'text');

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  @Output() invalidToken: EventEmitter<string> = new EventEmitter();
  @Output() isAuthenticated: EventEmitter<string> = new EventEmitter();
  rootPath = 'http://cubebioapi.inducosolutions.com/';
  apiservices: any = {
    login: this.rootPath + 'login',
    sendForgetPassword: this.rootPath + 'sendForgetPassword',
    resetPassword: this.rootPath + 'resetPassword',
    logout: this.rootPath + 'logout',
    getProfile: this.rootPath + 'getProfile',
    changePassword: this.rootPath + 'changePassword',
  }
  tokenVal = 'fasdfas';
  headerContent = {
    'Content-Type': 'application/json',
  };
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('responseType', 'text');

  constructor(private httpClient: HttpClient, private appData:AppDataService) {}
  doLogin(dataObj: any) {
    return new Promise((resolve, reject) => {
      const url = this.apiservices.login;
      this.httpClient.post<any>(url, dataObj, { headers: headers }).subscribe({
        next: (responseData) => {
          if(responseData['success'] === true){
            this.appData.isResetPasswordView = false;
            this.isAuthenticated.emit()
          }
          resolve(responseData);
        },
        error: (error) => {
          console.log('Error ' + JSON.stringify(error));
          reject(false);
        },
      });
    });
  }
  async apiCommunication(apiUrlStr: any, dataObj: any): Promise<boolean> {
    console.log('apiUrlStr', apiUrlStr);
    console.log('dataObj', JSON.stringify(dataObj));
    return new Promise((resolve, reject) => {
      const url = this.apiservices[apiUrlStr];
      console.log(url, JSON.stringify(dataObj));
      this.httpClient
        .post<any>(url, dataObj, { headers: this.headers })
        .subscribe({
          next: (responseData) => {
            console.log('Success ' + JSON.stringify(responseData));

            resolve(responseData);
          },
          error: (error) => {
            console.log('Error ' + JSON.stringify(error));
            reject(false);
          },
        });
    });
  }
  async getReqAPICall(apiStr: any): Promise<boolean> {
    console.log(apiStr);
    return new Promise((resolve, reject) => {
      const url = this.apiservices[apiStr];
      this.httpClient.get<any>(url, { headers: this.headers }).subscribe({
        next: (responseData) => {
          console.log('Success ' + JSON.stringify(responseData));
          resolve(responseData);
        },
        error: (error) => {
          console.log('Error ' + JSON.stringify(error));
          reject(false);
        },
      });
    });
  }
  getAuthStatus(): Boolean {
    return this.appData.isAuthenticated;
  }
  getToken() {
    return this.tokenVal;
  }
}
