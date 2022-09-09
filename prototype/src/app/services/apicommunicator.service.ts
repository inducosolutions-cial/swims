import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform } from '@ionic/angular';
const TOKEN_KEY = 'auth-token';
const USER_DATA = 'user-data';
@Injectable({
  providedIn: 'root',
})
export class ApicommunicatorService {
  @Output() isLocalDataAvailable: EventEmitter<any> = new EventEmitter();
  rootPath = 'http://dev.thegiftbank.in/public/api/';
  apiservices = {
    login: this.rootPath + 'login',
  };
  isDesktop = false;
  isUserLoggedIn = false;
  isAdminRole = false;
  loginData = {
    'admin@cubebioenergy.co.in': { role: 'admin', password: '123456' },
    'ashokalluri@cubebioenergy.co.in': {
      role: 'supervisor',
      password: '123456',
    },
    'umamaheswar@cubebioenergy.co.in': {
      role: 'supervisor',
      password: '123456',
    },
    'ram@cubebioenergy.co.in': {
      role: 'supervisor',
      password: '123456',
    },
    'srinadha@cubebioenergy.co.in': {
      role: 'supervisor',
      password: '123456',
    },
  };
  constructor(
    private storage: Storage,
    private network: Network,
    public plt: Platform
  ) {
    this.plt.ready().then(() => {
      if (this.plt.is('cordova')) {
        this.isDesktop = false;
        this.network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');
        });
        this.network.onConnect().subscribe(() => {
          console.log('network connected!');
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
    await this.storage.create();
    this.checkToken();
  }
  async checkToken() {
    this.storage.length().then((res) => {
      console.log(res);
      if (res === 0) {
        this.isLocalDataAvailable.emit(false);
      } else {
        this.storage.get(USER_DATA).then((uData) => {
          if (uData) {
            this.isLocalDataAvailable.emit(true);
          }
        });
      }
    });
  }
  login(username, password) {
    console.log(this.loginData[username]);
    if (this.loginData[username] === undefined) {
      return { success: false, message: 'Invalid UserID' };
    } else if (this.loginData[username].password !== password) {
      return { success: false, message: 'Incorrect Username / Password' };
    } else {
      if (
        this.loginData[username].role === 'admin' &&
        this.isDesktop === false
      ) {
        return { success: false, message: 'Admin can login in desktop only' };
      } else if (
        this.loginData[username].role === 'supervisor' &&
        this.isDesktop === true
      ) {
        return {
          success: false,
          message: 'Supervisor can login in Device only',
        };
      } else {
        this.isAdminRole = this.isDesktop;
        this.isUserLoggedIn = true;
        this.isLocalDataAvailable.emit(true);
        return { success: true };
      }
    }
  }
  checkSession() {
    console.log('Checking session');
  }
}
