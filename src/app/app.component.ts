import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApicommunicatorService } from './services/apicommunicator.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAppReady = false;
  selectedMenu = 'admin';
  constructor(
    public apiService: ApicommunicatorService,
    private navCtrl: NavController,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.apiService.isLocalDataAvailable.subscribe((flag) => {
      this.isAppReady = true;
      if (flag === false) {
        this.navCtrl.navigateRoot('login');
      } else {
        if (this.apiService.isAdminRole === true) {
          this.navCtrl.navigateRoot('admin');
        } else {
          this.navCtrl.navigateRoot('home');
        }
      }
    });
  }
  onMenuClick(item) {
    this.selectedMenu = item;
    this.navCtrl.navigateRoot(item);
  }
  viewProfile() {
    this.navCtrl.navigateRoot('profile');
  }
  viewHome() {
    this.navCtrl.navigateRoot('home');
  }
  logout() {
    this.apiService.isUserLoggedIn = false;
    this.navCtrl.navigateRoot('login');
  }
}
