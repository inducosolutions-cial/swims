/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApicommunicatorService } from 'src/app/services/apicommunicator.service';
import { AppdataService } from 'src/app/services/appdata.service';

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
    },
  ];
  currentStep = 1;
  selectedMenu = '';
  selectedMenuLabel = '';
  paymentsData= [];
  public searchData: any = {
    project: '',
    ward: '',
    sDate: '',
    eDate: '',
    customerType: '',
    category: '',
    subcategory: '',
  };
  constructor(
    private navCtrl: NavController,
    public appData: AppdataService,
    public appController: ApicommunicatorService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getPayments();
  }
  onMenuClick(menuObj) {
    this.selectedMenu = menuObj.type;
    this.selectedMenuLabel = menuObj.title;
    this.currentStep++;
  }
  backToHome() {
    this.navCtrl.navigateRoot('home');
  }
  searchDataChange(){
    this.getPayments();
  }
  async getPayments() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
      project_id: this.searchData.project,
      project_ward_id: this.searchData.ward,
      start_date: this.searchData.sDate,
      end_date: this.searchData.eDate,
    };
    this.appController
      .apiCommunication('getPayments', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.paymentsData = responseObj.data;
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  async showAlert(messageStr){
    const alert = await this.alertController.create({
      message: messageStr,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
  previousStep() {
    this.currentStep--;
  }
}
