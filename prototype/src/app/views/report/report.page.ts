import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  menuData = [
    {
      title: 'C&T',
      type: 'ct',
      className: 'btn-con gray-block',
    },
    {
      title: 'P&D',
      type: 'pd',
      className: 'btn-con gray-block',
    },
    {
      title: 'Bio mining',
      type: 'bio',
      className: 'btn-con gray-block',
    },
    {
      title: 'MRF',
      type: 'mrf',
      className: 'btn-con gray-block',
    }
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
