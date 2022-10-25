/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApicommunicatorService } from 'src/app/services/apicommunicator.service';
import { AppdataService } from 'src/app/services/appdata.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  selectedCustomer = null;
  selectedCustomerAddress = [];
  selectedAddress = null;
  selectedPayMode = 'cash';
  payingAmt = 0;
  customersData = [];
  searchStr = '';
  isUPIScannerView = false;
  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    public appData: AppdataService,
    public appController: ApicommunicatorService
  ) {}

  ngOnInit() {
    this.getCustomers();
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
  searchCustomers(evt) {
    console.log(evt.target.value);
    this.searchStr = evt.target.value;
    this.getCustomers();
  }
  onCustomersSelect(custObj) {
    console.log(JSON.stringify(custObj));
    this.selectedCustomer = custObj;
    this.getCustomerAddress();
    this.modal.dismiss();
  }
  addressChange(evt) {
    console.log(JSON.stringify(evt.target.value));
    const newwArr = this.selectedCustomerAddress.filter(
      (addObj) => Number(addObj.id) === Number(evt.target.value)
    );
    this.selectedAddress = newwArr[0];
    this.payingAmt = this.selectedAddress.amount;
    console.log(this.selectedAddress);
  }
  payModeChange(evt) {
    this.selectedPayMode = evt.target.value;
  }
  async confirmPayment() {
    const dataObj = {
      customer_address_id: this.selectedAddress.id,
      amount: this.payingAmt,
      payment_type: this.selectedPayMode,
    };
    this.appController
      .apiCommunication('confirmPayment', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.cancelPayment();
          this.showAlert('Successfully Paid');
        } else {
          this.showAlert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  proccedUPIScanner(){
    this.isUPIScannerView = true;
  }
  cancelUPI(){
    this.isUPIScannerView = false;
  }
  cancelPayment(){
    this.selectedCustomer = null;
    this.selectedCustomerAddress = [];
    this.selectedAddress = null;
    this.selectedPayMode = 'cash';
    this.payingAmt = 0;
    this.isUPIScannerView = false;
  }
  async getCustomerAddress() {
    const dataObj = {
      supervisor_id: this.appData.userData.user_id,
      customer_id: this.selectedCustomer.user_id,
    };
    this.appController
      .apiCommunication('getCustomerAddress', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.selectedCustomerAddress = responseObj.data;
          this.selectedAddress = this.selectedCustomerAddress[0];
          this.payingAmt = this.selectedAddress.amount;
          console.log(this.selectedAddress);
        } else {
          this.showAlert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  async getCustomers() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
      searchstring: this.searchStr,
      supervisor_id: this.appData.userData.user_id,
    };
    this.appController
      .apiCommunication('getCustomers', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.customersData = responseObj.data;
        } else {
          this.showAlert(responseObj.message);
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
}
