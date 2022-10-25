/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApicommunicatorService } from '../services/apicommunicator.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public isInvalid = false;
  public errorDetails = '';
  public errorMessages = {
    userId: [{ type: 'required', message: 'Username is required.' }],
    password: [{ type: 'required', message: 'Password is required.' }],
  };
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public apiService: ApicommunicatorService,
    public alertController: AlertController,
    private iab: InAppBrowser
  ) {
    this.loginForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  openPrivacy() {
    const browser = this.iab.create('https://www.stackoverflow.com', '_blank', {
      location: 'yes',
    });
    browser.close();
  }
  //Forgot password
  async forgotAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Forgot Password?',
      subHeader: 'Enter your email address associated with this account',
      message: '',
      inputs: [
        {
          name: 'email',
          type: 'text',
          id: 'email',
          placeholder: 'Email Address',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Ok',
          handler: (data) => {
            const emailValidation =
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailValidation.test(data.email)) {
              alert.message =
                '<b style="color: red;">Enter valid email id.</b>';
              return false;
            } else {
              var dataObj = {
                email: data.email,
              };
              this.apiService
                .apiCommunication('sendForgetPassword', dataObj)
                .then((responseObj: any) => {
                  console.log(JSON.stringify(responseObj));
                  if (responseObj['success']) {
                    window.alert('Change Password Link was sent to your mail');
                  } else {
                    window.alert(responseObj['message']);
                  }
                })
                .catch((error) => {});
            }
          },
        },
      ],
    });
    await alert.present();
  }
  // login submit
  onSubmit() {
    if (this.loginForm.valid) {
      this.isInvalid = false;
      const dataObj = {
        username: this.loginForm.get('userId').value,
        password: this.loginForm.get('password').value,
      };
      this.apiService
        .login(dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.loginForm.reset();
          } else {
            this.showAlert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async showAlert(messagestr) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Alert',
      message: messagestr,
      buttons: [
        {
          text: 'Ok',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }
}
