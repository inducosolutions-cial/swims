import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileData: any = null;
  changeForm: any;
  constructor(
    private authService: AuthServiceService,
    public appData: AppDataService,
    fb: FormBuilder
  ) {
    this.changeForm = fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }
  formObj(name: string) {
    return this.changeForm.get(name);
  }
  async changePassword() {
    if (this.changeForm.valid) {
      if (
        this.changeForm.get('newPassword').value !==
        this.changeForm.get('confirmPassword').value
      ) {
        window.alert('New Password and Confirm Password does not match');
      } else {
        var dataObj = {
          user_id: this.appData.user_id,
          old_password: this.changeForm.get('oldPassword').value,
          password: this.changeForm.get('newPassword').value,
        };
        this.authService
          .apiCommunication('changePassword', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              window.alert('Your password successfully changed');
              this.changeForm.reset();
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      }
    }
  }
  getProfile() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProfile', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.profileData = responseObj['data'][0];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
}
