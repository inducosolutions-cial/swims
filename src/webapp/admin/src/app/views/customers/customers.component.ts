import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WhiteSpaceValidator } from 'src/app/services/whitespace.validator';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  public customersData: any = [];
  public projectsData: any = [];
  public wardsData: any = [];
  public custTypesData: any = [];
  public catsData: any = [];
  public subCatsData: any = [];
  public statesData: any = [];
  public citiesData: any = [];
  public wardsSearchData: any = [];


  public formAct = "create"
  public customerForm: any;
  public searchObj:any = {
    searchStr:'',
    project: '',
    ward:'',
    customerType: '',
  }
  public customerObj: any = {
    customer_id:'',
    project: '',
    supervisor:'',
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
  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    public appData: AppDataService
  ) {
    this.customerForm = fb.group({
      project: ['', Validators.required],
      supervisor: ['', Validators.required],
      customerType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), WhiteSpaceValidator.noWhiteSpace]],
      email: ['', [Validators.required, WhiteSpaceValidator.noWhiteSpace]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      house_no: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60), WhiteSpaceValidator.noWhiteSpace]],
      address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250), WhiteSpaceValidator.noWhiteSpace]],
      locality: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250), WhiteSpaceValidator.noWhiteSpace]],
      postalcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), WhiteSpaceValidator.noWhiteSpace]],
    });
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getProjects();
    this.getCustomerTypes();
    this.getStates();
  }
  onSearchProjectSelect(){
    this.searchObj.ward = '';
    this.wardsSearchData = []
    this.getCustomers()
    if(this.searchObj.project !== ''){
      this.getSearchWardsByProject()
    }

  }
  async getSearchWardsByProject() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.searchObj.project,
    };
    this.authService
      .apiCommunication('getWardsByProjectId', dataObj)
      .then((responseObj: any) => {
        if (responseObj['success']) {
          this.wardsSearchData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  searchDataChange(){
    this.getCustomers()
  }
  async getCustomers() {
    var dataObj = {
      user_id: this.appData.user_id,
      searchstring: this.searchObj.searchStr,
      project_id: this.searchObj.project,
      project_ward_id: this.searchObj.ward,
      customer_type: this.searchObj.customerType,
      category_id: '',
      sub_category_id: '',
    };
    this.authService
      .apiCommunication('getCustomers', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.customersData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  onProjectSelect(){
    this.customerObj.supervisor = '';
    this.getWardsByProject()
  }
  getProjects() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProjects', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.projectsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  onWardSelect(){

  }
  async getWardsByProject() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.customerObj.project,
    };
    this.authService
      .apiCommunication('getWardsByProjectId', dataObj)
      .then((responseObj: any) => {
        if (responseObj['success']) {
          this.wardsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
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
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getCustomerTypes', dataObj)
      .then((responseObj: any) => {
        if (responseObj['success']) {
          this.custTypesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getCategories(cust_type: any) {
    var dataObj = {
      user_id: this.appData.user_id,
      customer_type_id: cust_type,
    };
    this.authService
      .apiCommunication('getCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.catsData = responseObj['data'];
          if (this.catsData.length > 0) {
            this.customerForm.addControl(
              'category',
              new FormControl('', [Validators.required])
            );
          }
        } else {
          window.alert(responseObj['message']);
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
    var dataObj = {
      user_id: this.appData.user_id,
      customer_type_id: cust_type,
      category_id: catid,
    };
    this.authService
      .apiCommunication('getSubCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.subCatsData = responseObj['data'];
          if (this.subCatsData.length > 0) {
            this.customerForm.addControl(
              'subcategory',
              new FormControl('', [Validators.required])
            );
          }
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }

  async getCities() {
    var dataObj = {
      user_id: this.appData.user_id,
      state_id: this.customerObj.state,
    };
    this.authService
      .apiCommunication('getCities', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.citiesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }

  onStateSelect() {
    this.customerObj.city = '';
    this.getCities();
  }
  async getStates() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getStates', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.statesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  onAddCustomer(){
    this.formAct = 'create'
    //this.customerForm.removeControl('category');
    //this.customerForm.removeControl('subcategory');
    this.customerObj = {
      customer_id:'',
      project: '',
      supervisor:'',
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
      unit:'1',
      state:'',
      city:'',
    };

  }
  editCustomer(custObj:any){
    /*{
      "id": 11,
      "user_id": 14,
      "role_id": 3,
      "created_by": 3,
      "supervisor_id": 8,
      "name": "praveen",
      "email": "fasdfa@fdasffdssa.com",
      "mobile": "3124123412",
      "house_no": "1-2345",
      "state_id": "2",
      "city_id": "3",
      "project_id": 1,
      "project_ward_id": "2",
      "address": "dsafads",
      "locality": "fadsfads",
      "postalcode": "452435",
      "unit": "1",
      "customer_type": "4",
      "category_id": 8,
      "sub_category_id": null,

  }*/
    this.formAct = 'edit'
    this.customerObj = {
      customer_id:custObj.id,
      project: custObj.project_id,
      supervisor:custObj.supervisor_id,
      customerType: custObj.customer_type,
      category: custObj.category_id,
      subcategory: custObj.sub_category_id,
      name:custObj.name,
      email:custObj.email,
      mobile:custObj.mobile,
      house_no:custObj.house_no,
      address:custObj.address,
      locality:custObj.locality,
      postalcode:custObj.postalcode,
      unit:custObj.unit,
      state:custObj.state_id,
      city:custObj.city_id,
    };
    this.getWardsByProject();
    this.getCities();
    if (this.customerObj.customerType !== '') {
      this.getCategories(this.customerObj.customerType);
    }
    if (this.customerObj.category !== '') {
      this.getSubCategories(
        this.customerObj.customerType,
        this.customerObj.category
      );
    }
  }
  submitCustomer(){
    if (this.customerForm.valid) {
      if(this.formAct === 'create'){
        let dataObj = {
          created_by: this.appData.user_id,
          supervisor_id:this.customerObj.supervisor,
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
        this.authService
          .apiCommunication('addCustomer', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getCustomers();
              this.closeModal.nativeElement.click();
              window.alert('Customer created successfully');
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      }else if(this.formAct === 'edit'){
        let dataObj = {
          user_id: this.appData.user_id,
          customer_id: this.customerObj.customer_id,
          supervisor_id:this.customerObj.supervisor,
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
        };
        this.authService
          .apiCommunication('updateCustomer', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getCustomers();
              this.closeModal.nativeElement.click();
              window.alert('User edited successfully');
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      }

    }else{
      this.customerForm.markAllAsTouched();
    }
  }
  onValueChange(e:any){
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

}
