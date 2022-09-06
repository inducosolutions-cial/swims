import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manageprojects',
  templateUrl: './manageprojects.page.html',
  styleUrls: ['./manageprojects.page.scss'],
})
export class ManageprojectsPage implements OnInit {
  currentView = 'grid';
  selectedMenu = 'c&t';
  newOperationName = '';
  newOperationWeightInd = '';
  feildTypes = ['text', 'number'];
  ctProject = [
    { id: 1, name: 'Windrows', weightInd: 'tons' },
    { id: 2, name: 'Turning', weightInd: 'tons' },
    { id: 3, name: 'D2D', weightInd: 'vehicles' },
    { id: 4, name: 'Screening', weightInd: 'tons' },
    { id: 5, name: 'Segregation ', weightInd: 'tons' },
  ];
  pdProject = [
    { id: 1, name: 'Windrows', weightInd: 'tons' },
    { id: 2, name: 'Turning', weightInd: 'tons' },
    { id: 3, name: 'D2D', weightInd: 'vehicles' },
    { id: 4, name: 'Screening', weightInd: 'tons' },
  ];
  bioProject = [
    { id: 1, name: 'Windrows', weightInd: 'tons' },
    { id: 2, name: 'Turning', weightInd: 'tons' },
    { id: 3, name: 'D2D', weightInd: 'vehicles' },
  ];
  mrfProject = [
    { id: 1, name: 'Windrows', weightInd: 'tons' },
    { id: 2, name: 'Turning', weightInd: 'tons' },
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

  async editCTProjectField(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Operation Details',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightInd',
          type: 'text',
          id: 'weightInd',
          value: item.weightInd
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
            item.weightInd = data.weightInd;
          }
        }
      ]
    });
    await alert.present();
  }
  deleteCTProjectField(id) {
    const newArr = this.ctProject.filter(project => project.id !== id);
    this.ctProject = newArr;
  }
  addCTProjectField() {
    this.ctProject.push({ id: this.getRandomNum(), name: this.newOperationName, weightInd: this.newOperationWeightInd });
    this.newOperationName = '';
    this.newOperationWeightInd = '';
  }

  async editPDProjectField(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Operation Details',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightInd',
          type: 'text',
          id: 'weightInd',
          value: item.weightInd
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
            item.weightInd = data.weightInd;
          }
        }
      ]
    });
    await alert.present();
  }
  deletePDProjectField(id) {
    const newArr = this.pdProject.filter(project => project.id !== id);
    this.pdProject = newArr;
  }
  addPDProjectField() {
    this.pdProject.push({ id: this.getRandomNum(), name: this.newOperationName, weightInd: this.newOperationWeightInd });
    this.newOperationName = '';
    this.newOperationWeightInd = '';
  }

  async editBIOProjectField(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Operation Details',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightInd',
          type: 'text',
          id: 'weightInd',
          value: item.weightInd
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
            item.weightInd = data.weightInd;
          }
        }
      ]
    });
    await alert.present();
  }
  deleteBIOProjectField(id) {
    const newArr = this.bioProject.filter(project => project.id !== id);
    this.bioProject = newArr;
  }
  addBIOProjectField() {
    this.bioProject.push({ id: this.getRandomNum(), name: this.newOperationName, weightInd: this.newOperationWeightInd });
    this.newOperationName = '';
    this.newOperationWeightInd = '';
  }

  async editMRFProjectField(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Edit Operation Details',
      message: '',
      inputs: [
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: item.name
        },
        {
          name: 'weightInd',
          type: 'text',
          id: 'weightInd',
          value: item.weightInd
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
            item.weightInd = data.weightInd;
          }
        }
      ]
    });
    await alert.present();
  }
  deleteMRFProjectField(id) {
    const newArr = this.mrfProject.filter(project => project.id !== id);
    this.mrfProject = newArr;
  }
  addMRFProjectField() {
    this.mrfProject.push({ id: this.getRandomNum(), name: this.newOperationName, weightInd: this.newOperationWeightInd });
    this.newOperationName = '';
    this.newOperationWeightInd = '';
  }

  getRandomNum() {
    return Math.floor((Math.random() * 9999) + 1);
  }


}
