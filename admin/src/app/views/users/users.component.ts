import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WhiteSpaceValidator } from 'src/app/services/whitespace.validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;
  public formAct = "create"
  public usersData = [];
  public userRoles = [];
  public statesData = [];
  public citiesData = [];
  public wardsData = [];
  public projectsData = [];
  public wardsSearchData = [];
  public userForm: any;
  public userObj: any = {
    user_id:'',
    role_id: '',
    ward: '',
    project: '',
    name: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    address: '',
    locality: '',
    postalcode: '',
  };
  public searchObj:any = {
    searchStr:'',
    project: '',
    ward:'',
  }
  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    public appData: AppDataService
  ) {
    this.userForm = fb.group({
      role_id: ['', Validators.required],
      project: ['', Validators.required],
      ward: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), WhiteSpaceValidator.noWhiteSpace]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), WhiteSpaceValidator.noWhiteSpace]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), WhiteSpaceValidator.noWhiteSpace]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250), WhiteSpaceValidator.noWhiteSpace]],
      locality: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(250), WhiteSpaceValidator.noWhiteSpace]],
      postalcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), WhiteSpaceValidator.noWhiteSpace]],
    });
  }

  ngOnInit(): void {
    this.getStates();
    this.getUserRoles();
    this.getUsers();
    this.getProjects();
  }

  onSearchProjectSelect(){
    this.searchObj.ward = '';
    this.wardsSearchData = []
    this.getUsers()
    /*if(this.searchObj.project !== ''){
      this.getSearchWardsByProject()
    }*/

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
    this.getUsers()
  }

  onProjectSelect(){
    this.userObj.ward = '';
    this.getWardsByProject();
  }
  onWardSelect(){
    console.log(this.userObj.ward)
  }
  onStateSelect() {
    this.userObj.city = '';
    this.getCities();
  }
  async getWardsByProject() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.userObj.project,
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
  async getCities() {
    var dataObj = {
      user_id: this.appData.user_id,
      state_id: this.userObj.state,
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
  async getUserRoles() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('userRoles', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.userRoles = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getUsers() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.searchObj.project,
    };
    this.authService
      .apiCommunication('getUsers', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.usersData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  editUser(userObj:any){
    this.formAct = 'edit'
    this.userObj = {
      user_id:userObj.user_id,
      name: userObj.name,
      email: userObj.email,
      mobile: userObj.mobile,
      role_id: userObj.role_id,
      state: userObj.state_id,
      city: userObj.city_id,
      ward: userObj.project_ward_id,
      project: userObj.project_id,
      address: userObj.address,
      locality: userObj.locality,
      postalcode: userObj.postalcode,
    }
    this.citiesData = [];
    this.wardsData = [];
    this.getWardsByProject();
    this.getCities();
  }
  onAddUser() {
    this.userObj = {
      user_id:'',
      role_id: '',
      project: '',
      ward: '',
      name: '',
      email: '',
      mobile: '',
      state: '',
      city: '',
      address: '',
      locality: '',
      postalcode: '',
    };
    this.citiesData = [];
    this.wardsData = [];
    this.formAct = 'create'
  }
  onCancelForm(){
    this.userObj = {
      user_id:'',
      name: '',
      email: '',
      project:'',
      mobile: '',
      role_id: '',
      state: '',
      city: '',
      ward: '',
      address: '',
      locality: '',
      postalcode: '',
    };
    this.citiesData = [];
    this.wardsData = [];
    this.userForm.reset();
  }
  submitUser() {
    if (this.userForm.valid) {
      if(this.formAct === 'create'){
        let dataObj = {
          created_by: this.appData.user_id,
          name: this.userObj.name,
          email: this.userObj.email,
          mobile: this.userObj.mobile,
          project_id: this.userObj.project,
          state_id: this.userObj.state,
          city_id: this.userObj.city,
          project_ward_id: this.userObj.ward,
          address: this.userObj.address,
          role_id: this.userObj.role_id,
          locality: this.userObj.locality,
          postalcode: this.userObj.postalcode,
          unit: '',
          customer_type: '',
          category_id: '',
          sub_category_id: '',
        };
        this.authService
          .apiCommunication('addUser', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getUsers();
              this.closeModal.nativeElement.click();
              window.alert('User created successfully');
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      }else if(this.formAct === 'edit'){
        let dataObj = {
          created_by: this.appData.user_id,
          user_id:this.userObj.user_id,
          name: this.userObj.name,
          email: this.userObj.email,
          mobile: this.userObj.mobile,
          project_id: this.userObj.project,
          state_id: this.userObj.state,
          city_id: this.userObj.city,
          project_ward_id: this.userObj.ward,
          address: this.userObj.address,
          role_id: this.userObj.role_id,
          locality: this.userObj.locality,
          postalcode: this.userObj.postalcode,
          unit: '',
          customer_type: '',
          category_id: '',
          sub_category_id: '',
        };
        this.authService
          .apiCommunication('updateUser', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getUsers();
              this.closeModal.nativeElement.click();
              window.alert('User edited successfully');
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      }

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
