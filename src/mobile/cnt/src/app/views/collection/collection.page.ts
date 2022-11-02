import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  menuData = [
    {
      title: 'Material',
      type: 'material',
      className: 'btn-con gray-block',
    },
    {
      title: 'Manpower',
      type: 'manpower',
      className: 'btn-con gray-block',
    },
    {
      title: 'Vehicles',
      type: 'vehicles',
      className: 'btn-con gray-block',
    },
    {
      title: 'Cash',
      type: 'cash',
      className: 'btn-con gray-block',
    },
    { title: 'User Charges', type: 'user', className: 'btn-con gray-block' },
     /*{
      title: 'Process MRF',
      type: 'processmrf',
      className: 'btn-con gray-block',
    },*/
  ];
  currentStep = 1;
  selectedMenu = '';
  selectedMenuLabel = '';
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  onMenuClick(menuObj) {
    this.selectedMenu = menuObj.type;
    this.selectedMenuLabel = menuObj.title;
    this.currentStep++;
  }
  backToHome() {
    this.navCtrl.navigateRoot('home');
  }
  previousStep() {
    this.currentStep--;
  }
}
