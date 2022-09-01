import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {
  currentView = 'grid';
  records = [
    {
      project: 'Collection & Transportation',
      materialName: 'Mixed waste',
      weight: '1.2',
      weightInd: 'tons',
      flow: 'Inbound',
      notes: '### ### ####### ##### ### ### ####### ##### ### ### ####### #####'
    },
    {
      project: 'Collection & Transportation',
      materialName: 'Compost',
      weight: '5',
      weightInd: 'tons',
      flow: 'Outbound',
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
