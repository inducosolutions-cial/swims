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

    getStates: this.rootPath + 'getStates',
    addState: this.rootPath + 'addState',
    updateState: this.rootPath + 'updateState',
    getCities: this.rootPath + 'getCities',
    addCity: this.rootPath + 'addCity',
    updateCity: this.rootPath + 'updateCity',


    getUsers: this.rootPath + 'getUsers',
    userRoles: this.rootPath + 'userRoles',
    addUserRole: this.rootPath + 'addRole',
    updateUserRole: this.rootPath + 'updateRole',
    addUser: this.rootPath + 'addUser',
    updateUser: this.rootPath + 'updateUser',


    getCharges: this.rootPath + 'getCharges',
    addCharge: this.rootPath + 'addCharge',
    updateCharge: this.rootPath + 'updateCharge',


    getProjects: this.rootPath + 'getProjects',
    addProject: this.rootPath + 'addProject',
    updateProject: this.rootPath + 'updateProject',

    getWardsByProjectId: this.rootPath + 'getWardsByProjectId',
    addProjectWard: this.rootPath + 'addProjectWard',
    updateProjectWard: this.rootPath + 'updateProjectWard',

    getProjectTypes: this.rootPath + 'getProjectTypes',
    addProjectType: this.rootPath + 'addProjectType',
    updateProjectType: this.rootPath + 'updateProjectType',

    getCustomerTypes: this.rootPath + 'getCustomerTypes',
    addCustomerType: this.rootPath + 'addCustomerType',
    updateCustomerType: this.rootPath + 'updateCustomerType',
    getCategories: this.rootPath + 'getCategories',
    addCategory: this.rootPath + 'addCategory',
    updateCategory: this.rootPath + 'updateCategory',
    addSubCategory: this.rootPath + 'addSubCategory',
    getSubCategories: this.rootPath + 'getSubCategories',
    updateSubCategory: this.rootPath + 'updateSubCategory',

    getCustomers: this.rootPath + 'getCustomers',
    addCustomer: this.rootPath + 'addCustomer',
    updateCustomer: this.rootPath + 'updateCustomer',

    getPayments: this.rootPath + 'getPayments',
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
