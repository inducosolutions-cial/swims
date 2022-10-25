/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ApicommunicatorService } from './services/apicommunicator.service';
import { AppdataService } from './services/appdata.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAppReady = false;
  selectedMenu = 'admin';
  constructor(
    public appData:AppdataService,
    public apiService: ApicommunicatorService,
    private navCtrl: NavController,
    public router: Router,
    public menu: MenuController
  ) {}
  ngOnInit(): void {
    this.apiService.isLocalDataAvailable.subscribe((flag) => {
      console.log('*************************'+flag);
      this.isAppReady = true;
      if (flag === false) {
        this.navCtrl.navigateRoot('login');
      } else {
          this.apiService.isUserLoggedIn = true;
          console.log(JSON.stringify(this.appData.userData));
          if(this.appData.userData.role_id === 2){
            this.getProfile();
            this.apiService.isMobileUser = true;
            this.navCtrl.navigateRoot('home');
          }else{
            this.apiService.isMobileUser = false;
            this.navCtrl.navigateRoot('');
          }
      }
    });
  }
  getProfile() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
    };
    this.apiService
      .apiCommunication('getProfile', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.appData.profileData = responseObj['data'][0];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  onMenuClick(item) {
    this.selectedMenu = item;
    this.navCtrl.navigateRoot(item);
  }
  viewProfile() {
    this.menu.toggle();
    this.navCtrl.navigateRoot('profile');
  }
  viewHome() {
    this.menu.toggle();
    this.navCtrl.navigateRoot('home');
  }
  logout() {
    this.menu.toggle();
    this.apiService.isUserLoggedIn = false;
    this.apiService.logout();
    this.navCtrl.navigateRoot('login');
  }
}
