import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  currentView = 'grid';
  selectedMenu = 'mir';
  constructor(private navCtrl: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
  onMenuChange(evt) {
    console.log(evt.target.value);
    this.selectedMenu = evt.target.value;
  }
}
