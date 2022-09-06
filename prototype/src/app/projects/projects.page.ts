import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  currentView = 'grid';
  records = [
    {
      project: 'Collection & Transportation',
      operationName: 'Windrows',
      weight: '1.2',
      weightInd: 'tons',
      time: '2',
      range: 'hrs',
      notes: '### ### ####### ##### ### ### ####### ##### ### ### ####### #####'
    },
    {
      project: 'Collection & Transportation',
      operationName: 'Turning',
      weight: '5',
      weightInd: 'tons',
      time: '2',
      range: 'days',
      notes: '### ### ####### ##### ### ### ####### ##### ### ### ####### #####'
    }
  ];
  constructor(private navCtrl: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
  onAddRecordClick() {
    this.currentView = 'form';
  }
  cancelRecord() {
    this.currentView = 'grid';
  }
  addRecod() {
    this.currentView = 'grid';
  }
  editRecord(item) {
    this.currentView = 'form';
  }
  async deleteRecord(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Delete Record',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
          }
        }
      ]
    });
    await alert.present();
  }
}
