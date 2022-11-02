import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  loginForm: any;
  forgotForm: any;

  constructor(
    private authService: AuthServiceService,
    public appData: AppDataService,
    fb: FormBuilder,
    private router: Router,
    private localStore: LocalstorageService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.forgotForm = fb.group({
      email: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }
  formObj(name: string) {
    return this.loginForm.get(name);
  }
  forgotFormObj(name: string) {
    return this.forgotForm.get(name);
  }
  loginUser(): void {
    console.log("login usr "+this.loginForm.valid)
    if (this.loginForm.valid) {
      var dataObj = {
        "username": this.loginForm.get('email').value,
        "password": this.loginForm.get('password').value
      }
      this.authService.doLogin(dataObj).then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          /*
          {"success":true,"data":{"user_id":1,"role_id":1,"username":"rajeshm@inducosolutions.com","name":"superadmin","corporate_code":"007","email":"rajeshm@inducosolutions.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmJmN2RjZjllZjU0MzY4MWNiZmUxMzExNmQyMDVmNThlNzZiZDE3ZDc0NGIyNDVlYjcyZjcxMzExMTEwNzA4Y2EzNWU4NjM4MGUzMmU2ODIiLCJpYXQiOjE2MzA5MDQ0MzQuOTkzNjc4MDkyOTU2NTQyOTY4NzUsIm5iZiI6MTYzMDkwNDQzNC45OTM2ODUwMDcwOTUzMzY5MTQwNjI1LCJleHAiOjE2NDY1NDI4MzQuODM2MjgyOTY4NTIxMTE4MTY0MDYyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.Rv-OIsSsZgDnZEYDkMsvpn8bK7O-gXXe8SvCT-s7He6Ov3695nLy9D4DTHDlbvTbiBQnNjRKdmqSGtYzAkDaYkgTh4S2I2UW08ITCAeEAR1cvXU4sT32hKoBcRWY-aX5bZpHlmqZ0tYTEaTjNN1MmLw-zlo_1roqgusVnX7x5hBvNCY30Z1DDdhVqUWdP8ISGUoCMD0jygT-G44_5swKxPrD6173_N-CHWwATAjyAlAsNtQEko2Cv57GgV7Z7xIxGf4z90TmtcO1g4bnVE0GippX3f3VUy8m31TgsFUiEr5_InXuy34feC7Rg5WjmQzneK3e9pJvjvwbsiBMJVFXO9QYMWUM4z1cfocfm5z7ysIC68aMwrAspMjiNePbXJ4aP5N0kJ0HRxuaRCJB45A8Kg1ZEtmHGsnCv6B3heT1jEf-Qwl6e3Z_IBdHPkhUXtD6qSQjkK3caHIBq_hJBJ0VawdXNgmIknbm44RUkt63JR0yozRGWNWJDdCL6L3eh6-3BQvonyj05k9psxFt4-mMWE7PICiI7pApfW1HTf5hHPE-vhe4xMS892OsSeJrX_qh9APrli6d7pg8nYrpIi5D672AW88t6EiAAqse1m7t_9_fSKoIj6ysb5JmLsraxIhi70XUuzx1Cto2lPsL84UbiPu8Mx6EyXktcPcaMrhH0QU"},"message":"User login successfully."}
          */
          this.appData.currentToken = responseObj["data"].token;
          this.appData.username = responseObj["data"].username;
          this.appData.name = responseObj["data"].name;
          this.appData.user_id = responseObj["data"].user_id;
          this.appData.role_id = responseObj["data"].role_id;
          this.localStore.setInfo(responseObj["data"]);
          this.router.navigate(['/']);
          this.appData.isAuthenticated = true;
          this.loginForm.reset()
        } else {
          window.alert(responseObj['message'])
        }
      }).catch(error => {
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  requestForgotPassword() {
    console.log("forgot usr "+this.forgotForm.valid)
    if (this.forgotForm.valid) {
      var dataObj = {
        "email": this.forgotForm.get('email').value
      }
      this.authService.apiCommunication('sendForgetPassword', dataObj).then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.closeModal.nativeElement.click();
          this.forgotForm.reset()
          window.alert('Change Password Link was sent to your mail')
        } else {
          window.alert(responseObj['message'])
        }
      }).catch(error => {
      })
    }else{

    }
  }
}
