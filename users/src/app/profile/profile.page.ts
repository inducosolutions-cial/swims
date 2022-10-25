/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApicommunicatorService } from '../services/apicommunicator.service';
import { AppdataService } from '../services/appdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public submitForm: FormGroup;
  public errorMessages = {
    oldPass: [{ type: 'required', message: 'Please enter Old Password' }],
    newPass: [{ type: 'required', message: 'Please enter New Password' }],
    conPass: [{ type: 'required', message: 'Please enter Confirm Password' }],
  };

  constructor(
    private navCtrl: NavController,
    public appData: AppdataService,
    public appController: ApicommunicatorService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) {
    this.submitForm = this.formBuilder.group({
      oldPass: new FormControl('', Validators.required),
      newPass: new FormControl('', Validators.required),
      conPass: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async submitPassword() {
    if (this.submitForm.valid === true) {
      if (
        this.submitForm.get('newPass').value !==
        this.submitForm.get('conPass').value
      ) {
        this.showAlert('New Password and Confirm Password does not match', 'error');
      }else{
        const loading = await this.loadingController.create({
          message: 'Please wait...',
        });
        loading.present();
        const dataObj = {
          user_id: this.appData.userData.user_id,
          old_password: this.submitForm.get('oldPass').value,
          password: this.submitForm.get('newPass').value,
        };
        this.appController.apiCommunication('changePassword', dataObj).then((data) => {
          if (data['success'] === false) {
            this.showAlert(data['message'], 'error');
          } else {
            this.submitForm.reset();
            this.showAlert('Your password has changed succesfully.', 'success');
          }
          loading.dismiss();
        });
      }

    }
  }
  async showAlert(messageStr, flag) {
    if (flag === 'success') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: messageStr,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
            },
          },
        ],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: messageStr,
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
}
