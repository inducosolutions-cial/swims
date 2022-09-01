import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-managemeterial',
  templateUrl: './managemeterial.page.html',
  styleUrls: ['./managemeterial.page.scss'],
})
export class ManagemeterialPage implements OnInit {

  currentView = 'grid';
  selectedMenu = 'inbound';
  newMaterialName = '';
  newMaterialWeightVal = '';
  inboundMaterialsData = [
    { id: 1, name: 'Mixed waste', weightVal: 'tons' },
    { id: 2, name: 'Dry waste', weightVal: 'tons' },
    { id: 3, name: 'Wet waste', weightVal: 'tons' },
    { id: 4, name: 'Diesel', weightVal: 'litres' },
    { id: 5, name: 'EM solution', weightVal: 'litres' },
  ];
  outboundMaterialsData = [
    { id: 1, name: 'Compost', weightVal: 'tons' },
    { id: 2, name: 'RDF', weightVal: 'tons' },
    { id: 3, name: 'Plastic ', weightVal: 'tons' },
    { id: 4, name: 'Paper ', weightVal: 'tons' },
    { id: 5, name: 'Metals ', weightVal: 'tons' },
  ];
  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {

  }
  onMenuChange(evt) {
    console.log(evt.target.value);
    this.selectedMenu = evt.target.value;
  }
  async editInboundMaterial(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Material Title',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightVal',
          type: 'text',
          id: 'weightVal',
          value: item.weightVal
        }
      ],
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
            console.log(data.name);
            item.name = data.name;
            item.weightVal = data.weightVal;
          }
        }
      ]
    });
    await alert.present();
  }
  deleteInboundMaterial(id) {
    const newArr = this.inboundMaterialsData.filter(material => material.id !== id);
    this.inboundMaterialsData = newArr;
  }
  addInboundMaterial() {
    console.log(this.newMaterialName)
    this.inboundMaterialsData.push({ id: this.getRandomNum(), name: this.newMaterialName, weightVal: this.newMaterialWeightVal });
    this.newMaterialName = '';
  }
  async editOutboundMaterial(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Material Title',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightVal',
          type: 'text',
          id: 'weightVal',
          value: item.weightVal
        }
      ],
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
            console.log(data.name);
            item.name = data.name;
            item.weightVal = data.weightVal;
          }
        }
      ]
    });
    await alert.present();
  }
  deleteOutboundMaterial(id) {
    const newArr = this.outboundMaterialsData.filter(material => material.id !== id);
    this.outboundMaterialsData = newArr;
  }
  addOutboundMaterial() {
    console.log(this.newMaterialName)
    this.outboundMaterialsData.push({ id: this.getRandomNum(), name: this.newMaterialName, weightVal: this.newMaterialWeightVal });
    this.newMaterialName = '';
  }
  getRandomNum() {
    return Math.floor((Math.random() * 9999) + 1);
  }

}
