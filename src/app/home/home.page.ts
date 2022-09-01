import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController,) { }
  onMenuClick(btnType) {
    if (btnType === 'material') {
      this.navCtrl.navigateRoot('materials');
    } else if (btnType === 'amount') {
      this.navCtrl.navigateRoot('amounts');
    } else if (btnType === 'projects') {
      this.navCtrl.navigateRoot('projects');
    }
  }
}
