import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  customerData = [
    {id:1, name:'Ashok'},
    {id:2, name:'Rajesh'},
  ];
  selectedCustomer = '';
  constructor(private navCtrl: NavController,
    public alertController: AlertController,) { }

  ngOnInit() {
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
  onCustomerSearch(){
    console.log(this.selectedCustomer)
  }
}
