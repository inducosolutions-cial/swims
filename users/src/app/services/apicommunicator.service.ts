/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BehaviorSubject } from 'rxjs';
import { AppdataService } from './appdata.service';

const TOKEN_KEY = 'auth-token';
const USER_DATA = 'user-data';

@Injectable({
  providedIn: 'root',
})
export class ApicommunicatorService {
  @Output() isLocalDataAvailable: EventEmitter<any> = new EventEmitter();
  private _storage: Storage | null = null;
  rootPath = 'http://cubebioapi.inducosolutions.com/';
  apiservices = {
   login: this.rootPath + 'login',
    sendForgetPassword: this.rootPath + 'sendForgetPassword',
    resetPassword: this.rootPath + 'resetPassword',
    logout: this.rootPath + 'logout',
    getProfile: this.rootPath + 'getProfile',
    changePassword: this.rootPath + 'changePassword',

    getStates: this.rootPath + 'getStates',
    getCities: this.rootPath + 'getCities',
    getUsers: this.rootPath + 'getUsers',
    getCustomerTypes: this.rootPath + 'getCustomerTypes',
    getCategories: this.rootPath + 'getCategories',
    getSubCategories: this.rootPath + 'getSubCategories',
    getCustomers: this.rootPath + 'getCustomers',
    addCustomer: this.rootPath + 'addCustomer',

    getCustomerAddress: this.rootPath + 'getCustomerAddress',
    confirmPayment: this.rootPath + 'confirmPayment',
  };
  isDesktop = false;
  isUserLoggedIn = false;
  isMobileUser = false;
  authenticationState = new BehaviorSubject(false);

  headerContent = {
    'Content-Type': 'application/json',
  };
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('responseType', 'text');

  constructor(
    private storage: Storage,
    private network: Network,
    public plt: Platform,
    public loadingController: LoadingController,
    private httpClient: HttpClient,
    public http: HTTP,
    private appData: AppdataService,
  ) {
    this.plt.ready().then(() => {
      if (this.plt.is('cordova')) {
        this.isDesktop = false;
        this.network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');
        });
        this.network.onConnect().subscribe(() => {
          setTimeout(() => {
            console.log('Internet Connection : ' + this.network.type);
            this.createLocalStorageInstance();
          }, 3000);
        });
      } else {
        this.isDesktop = true;
        if (this.plt.width() <= 820) {
          this.isDesktop = false;
        }
        this.createLocalStorageInstance();
      }
    });
  }
  async createLocalStorageInstance() {
    this._storage = await this.storage.create();
    this.checkToken();
  }
  async checkToken() {
    const loading = await this.loadingController.create({
      message: 'Checking local Data',
    });
    loading.present();
    this.storage.length().then((res) => {
      console.log(res);
      if (res === 0) {
        this.isLocalDataAvailable.emit(false);
      } else {
        this.storage.get(USER_DATA).then((uData) => {
          if (uData) {
            this.appData.userData = uData;
            this.authenticationState.next(true);
            this.isLocalDataAvailable.emit(true);
          }
        });
      }
      loading.dismiss();
    });
  }
  storValuetoDevice(keyStr, valueStr) {
    this.storage.set(keyStr, valueStr);
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
  logout() {
    this.storage.remove(USER_DATA);
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.clear();
      this.authenticationState.next(false);
    });
  }

  async login(dataObj: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.apiservices.login;
      this.httpClient
        .post<any>(url, dataObj, { headers: this.headers })
        .subscribe({
          next: (responseData) => {
            console.log('login Response : ', JSON.stringify(responseData));
            if (responseData.success === false) {
              this.authenticationState.next(false);
              resolve(responseData);
            } else {
              this.appData.userData = responseData.data;
              this.headers.set('Authorization','Bearer ' + this.appData.userData.token),
              this.storValuetoDevice(TOKEN_KEY, this.appData.userData.token);
              this.storValuetoDevice(USER_DATA, this.appData.userData);
              this.isLocalDataAvailable.emit(true);
              this.authenticationState.next(true);
              resolve(responseData);
            }
          },
          error: (error) => {
            this.authenticationState.next(false);
            reject(false);
          },
        });
    });
  }
  async apiCommunication(apiStr, dataObj) {
    //dataObj['auth_id'] = this.appData.userData['id'];
    return new Promise((resolve, reject) => {
      const url = this.apiservices[apiStr];
      console.log(url+':'+JSON.stringify(dataObj));
      this.httpClient
        .post<any>(url, dataObj, { headers: this.headers })
        .subscribe({
          next: (responseData) => {
            console.log(JSON.stringify(responseData));
            resolve(responseData);
          },
          error: (error) => {
            console.log('Error ' + JSON.stringify(error));
            reject(false);
          },
        });
    });
  }
  public getAPICommun(apiStr): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const url = this.apiservices[apiStr];
      this.httpClient.get<any>(url, { headers: this.headers }).subscribe({
        next: (responseData) => {
          resolve(responseData);
        },
        error: (error) => {
          console.log('GetAPICommun : ', JSON.stringify(error));
          reject(false);
        },
      });
    });
  }
}
