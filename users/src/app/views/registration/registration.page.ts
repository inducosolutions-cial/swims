import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private navCtrl: NavController,
    public alertController: AlertController,) { }

  ngOnInit() {
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
}
