import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  changePasswordForm: any;
  isFormAsError = false;
  errorDetails: any;
  constructor(
    fb: FormBuilder,
    private appData: AppDataService,
    private appController: AuthServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.changePasswordForm = fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .subscribe(params => {
        this.appData.resetPasswordToken = params.get('token');
      });
    console.log(this.appData.resetPasswordToken)
  }
  formObj(name: string) {
    return this.changePasswordForm.get(name);
  }
  onChangePasswordSubmit() {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.get('newPassword').value != this.changePasswordForm.get('confirmPassword').value) {
        this.isFormAsError = true;
        this.errorDetails = "New Password and Confirm Password should be same";
        return;
      }
      var dataObj = {
        "remember_token": this.appData.resetPasswordToken,
        "password": this.changePasswordForm.get('newPassword').value
      }
      this.appController.apiCommunication("resetPassword", dataObj).then((responseObj: any) => {
        console.log(JSON.stringify(responseObj))
        if (responseObj['success'] === true) {
          this.isFormAsError = false;
          this.errorDetails = "";
          this.closeDialog()
        } else {
          this.isFormAsError = true;
          this.errorDetails = responseObj['data'].error;
        }
      }).catch(error => {
        console.log("")
        this.isFormAsError = true;
        this.errorDetails = "Some problem while trying to server. Please try again";
      })
    } else {
      this.isFormAsError = true;
      this.errorDetails = "All fields are Mandatory."
    }
  }
  closeDialog() {
    this.appData.isResetPasswordView = false;
    this.appData.isAuthenticated = false;
  }

}
