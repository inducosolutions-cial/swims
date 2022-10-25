import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppdataService } from '../services/appdata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuData = [
    {
      title: 'Payments',
      type: 'payment',
      icon: '<i class="bi bi-currency-rupee"></i>',
      className: 'btn-con gray-block',
    },
    {
      title: 'Registration',
      type: 'registration',
      icon: '<i class="bi bi-journal-plus"></i>',
      className: 'btn-con red-block',
    },
    {
      title: 'Reports',
      type: 'report',
      icon: '<i class="bi bi-table"></i>',
      className: 'btn-con green-block',
    },
  ];
  constructor(private navCtrl: NavController, public appData:AppdataService) {}
  onMenuClick(btnType) {
    this.navCtrl.navigateRoot(btnType);
  }
}
