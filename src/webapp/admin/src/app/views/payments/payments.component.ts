import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public paymentsData: any = [];
  public searchData: any = {
    project: '',
    ward: '',
    sDate: '',
    eDate: '',
    customerType: '',
    category: '',
    subcategory: '',
  };
  public searchCustTypesData: any = [];
  public searchCatsData: any = [];
  public searchSubCatsData: any = [];
  public projectsData: any = [];
  public wardsSearchData: any = [];
  constructor(
    private authService: AuthServiceService,
    public appData: AppDataService
  ) {}

  ngOnInit(): void {
    this.getPayments();
    this.getProjects();
    //this.getCustomerTypesForSearch();
  }
  searchDataChange() {
    this.getPayments();
  }
  onSearchProjectSelect() {
    this.searchData.ward = '';
    this.wardsSearchData = [];
    this.getPayments();
    if (this.searchData.project !== '') {
      this.getSearchWardsByProject();
    }
  }
  async getSearchWardsByProject() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.searchData.project,
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
  async getPayments() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.searchData.project,
      project_ward_id: this.searchData.ward,
      start_date: this.searchData.sDate,
      end_date: this.searchData.eDate,
    };
    this.authService
      .apiCommunication('getPayments', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.paymentsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getCustomerTypesForSearch() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getCustomerTypes', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.searchCustTypesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getCategoriesForSearch(cust_type: any) {
    var dataObj = {
      user_id: this.appData.user_id,
      customer_type_id: cust_type,
    };
    this.authService
      .apiCommunication('getCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.searchCatsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getSubCategoriesForSearch(cust_type: any, catid: any) {
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
          this.searchSubCatsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  onSearchCustTypeSelect() {
    console.log(this.searchData.customerType);
    this.searchData.category = '';
    this.searchData.subcategory = '';
    if (this.searchData.customerType !== '') {
      this.getCategoriesForSearch(this.searchData.customerType);
    }
  }
  onSearchCatSelect() {
    this.searchData.subcategory = '';
    if (this.searchData.category !== '') {
      this.getSubCategoriesForSearch(
        this.searchData.customerType,
        this.searchData.category
      );
    }
  }
}
