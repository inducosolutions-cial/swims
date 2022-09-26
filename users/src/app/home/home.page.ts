import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuData = [
    {
      title: 'Collection & Transportation',
      type: 'collection',
      className: 'btn-con gray-block',
    },
    {
      title: 'Processing & Disposal',
      type: 'processing',
      className: 'btn-con red-block',
    },
    {
      title: 'Biomining',
      type: 'biomining',
      className: 'btn-con brown-block',
    },
    {
      title: 'Material Recovery Facilities',
      type: 'recovery',
      className: 'btn-con green-block',
    },
    { title: 'Reports', type: 'report', className: 'btn-con leaf-block' },
  ];
  constructor(private navCtrl: NavController) {}
  onMenuClick(btnType) {
    if (btnType === 'collection') {
      this.navCtrl.navigateRoot('collection');
    } else if (btnType === 'amount') {
      this.navCtrl.navigateRoot('amounts');
    } else if (btnType === 'projects') {
      this.navCtrl.navigateRoot('projects');
    } else {
      this.navCtrl.navigateRoot(btnType);
    }
  }
}
