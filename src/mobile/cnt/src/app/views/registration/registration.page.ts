/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ApicommunicatorService } from 'src/app/services/apicommunicator.service';
import { AppdataService } from 'src/app/services/appdata.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public custTypesData: any = [];
  public catsData: any = [];
  public subCatsData: any = [];

  public statesData: any = [];
  public citiesData: any = [];
  public customerForm: FormGroup;
  public customerObj: any = {
    customer_id:'',
    customerType: '',
    category: '',
    subcategory: '',
    name:'',
    email:'',
    mobile:'',
    house_no:'',
    address:'',
    locality:'',
    postalcode:'',
    state:'',
    city:'',
  };
  public errorMessages = {
    customerType: [{ type: 'required', message: 'Select Customer Type' }],
    category: [{ type: 'required', message: 'Select Category' }],
    subcategory: [{ type: 'required', message: 'Select Sub Category' }],
    name: [{ type: 'required', message: 'Please enter User Name' }],
    mobile: [{ type: 'required', message: 'Please enter Valid Mobile' }],
    email: [{ type: 'required', message: 'Please enter Valid Email' }],
    door: [{ type: 'required', message: 'Please enter Door Number' }],
    locality: [{ type: 'required', message: 'Please enter Locality' }],
    address: [{ type: 'required', message: 'Please enter Address' }],
    state: [{ type: 'required', message: 'Select State' }],
    city: [{ type: 'required', message: 'Select City' }],
    pincode: [{ type: 'required', message: 'Please enter Pincode' }],
  };

  constructor(
    private navCtrl: NavController,
    public appData: AppdataService,
    public appController: ApicommunicatorService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.customerForm = this.formBuilder.group({
      customerType: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      door: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      locality: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }

  ngOnInit() {
    this.getCustomerTypes();
    this.getStates();
  }
  onCustTypeSelect() {
    this.customerObj.category = '';
    this.customerObj.subcategory = '';
    this.customerForm.removeControl('category');
    this.customerForm.removeControl('subcategory');
    if (this.customerObj.customerType !== '') {
      this.getCategories(this.customerObj.customerType);
    }
  }
  async getCustomerTypes() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
    };
    this.appController
      .apiCommunication('getCustomerTypes', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.custTypesData = responseObj.data;
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  async getCategories(cust_type: any) {
    const dataObj = {
      user_id: this.appData.userData.user_id,
      customer_type_id: cust_type,
    };
    this.appController
      .apiCommunication('getCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj.success) {
          this.catsData = responseObj.data;
          if (this.catsData.length > 0) {
            this.customerForm.addControl(
              'category',
              new FormControl('', [Validators.required])
            );
          }
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  onCatSelect() {
    this.customerObj.subcategory = '';
    if (this.customerObj.category !== '') {
      this.getSubCategories(
        this.customerObj.customerType,
        this.customerObj.category
      );
    }
  }
  async getSubCategories(cust_type: any, catid: any) {
    const dataObj = {
      user_id: this.appData.userData.user_id,
      customer_type_id: cust_type,
      category_id: catid,
    };
    this.appController
      .apiCommunication('getSubCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj.success) {
          this.subCatsData = responseObj.data;
          if (this.subCatsData.length > 0) {
            this.customerForm.addControl(
              'subcategory',
              new FormControl('', [Validators.required])
            );
          }
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }

  async getCities() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
      state_id: this.customerObj.state,
    };
    this.appController
      .apiCommunication('getCities', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj.success) {
          this.citiesData = responseObj.data;
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }

  onStateSelect() {
    this.customerObj.city = '';
    if(this.customerObj.city !== ''){
      this.getCities();
    }
  }
  async getStates() {
    const dataObj = {
      user_id: this.appData.userData.user_id,
    };
    this.appController
      .apiCommunication('getStates', dataObj)
      .then((responseObj: any) => {
        if (responseObj.success) {
          this.statesData = responseObj.data;
        } else {
          window.alert(responseObj.message);
        }
      })
      .catch((error) => {});
  }
  submitCustomer() {
    if (this.customerForm.valid) {
        const dataObj = {
          created_by: this.appData.userData.user_id,
          supervisor_id:this.appData.userData.user_id,
          customer_type: this.customerObj.customerType,
          category_id: this.customerObj.category,
          sub_category_id: this.customerObj.subcategory,
          name: this.customerObj.name,
          email: this.customerObj.email,
          mobile: this.customerObj.mobile,
          house_no: this.customerObj.house_no,
          state_id: this.customerObj.state,
          city_id: this.customerObj.city,
          address: this.customerObj.address,
          locality: this.customerObj.locality,
          postalcode: this.customerObj.postalcode,
          unit: '1',
        };
        this.appController
          .apiCommunication('addCustomer', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj.success) {
              this.customerObj = {
                customer_id:'',
                customerType: '',
                category: '',
                subcategory: '',
                name:'',
                email:'',
                mobile:'',
                house_no:'',
                address:'',
                locality:'',
                postalcode:'',
                state:'',
                city:'',
              };
              this.customerForm.removeControl('category');
              this.customerForm.removeControl('subcategory');
              this.customerForm.reset();
              this.showAlert('Customer created successfully');
            } else {
              this.showAlert(responseObj.message);
            }
          })
          .catch((error) => {});
      }
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
  onValueChange(e){
    console.log(e.target.name)
    if(e.target.name === 'mobile'){
      const pattern = /[0-9\+\-\ ]/;
      const invalidChars = ["-", "+", "e", "E"];
      if (
        invalidChars.includes(e.key) || !pattern.test(e.key) || (e.target.value.length > 9)
      ) {
        e.preventDefault();
      }
    }else if(e.target.name === 'postalcode'){
      const pattern = /[0-9\+\-\ ]/;
      const invalidChars = ["-", "+", "e", "E"];
      if (
        invalidChars.includes(e.key) || !pattern.test(e.key) || (e.target.value.length > 5)
      ) {
        e.preventDefault();
      }
    }else if(e.target.name === 'email'){
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
      if (!pattern.test(e.key)) {
        e.preventDefault();
      }
    }

  }
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
}
