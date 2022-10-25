import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
})
export class ChargesComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  public formAct = 'create';
  isAddChargeOpened = false;

  public chargeForm: any;
  public chargesData: any = [];
  public selectedCharge: any = {
    charge_id: '',
    project: '',
    customerType: '',
    category: '',
    subcategory: '',
    chargeAmt: 0,
  };
  public searchData: any = {
    project: '',
    customerType: '',
    category: '',
    subcategory: '',
  };

  public projectsData: any = [];
  public custTypesData: any = [];
  public catsData: any = [];
  public subCatsData: any = [];
  public searchProjectsData: any = [];
  public searchCustTypesData: any = [];
  public searchCatsData: any = [];
  public searchSubCatsData: any = [];

  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    public appData: AppDataService
  ) {
    this.chargeForm = fb.group({
      project: ['', Validators.required],
      customerType: ['', Validators.required],
      chargeAmt: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCharges();
    this.getProjects();
    this.getCustomerTypes();
    this.getProjectsForSearch();
    this.getCustomerTypesForSearch();
  }
  async getProjects() {
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
  async getCustomerTypes() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getCustomerTypes', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.custTypesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getCategories(cust_type: any) {
    console.log('---------' + this.catsData.length);
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
            this.chargeForm.addControl(
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
            this.chargeForm.addControl(
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

  async getProjectsForSearch() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProjects', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.searchProjectsData = responseObj['data'];
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
    console.log('---------' + this.catsData.length);
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

  onCustTypeSelect() {
    this.selectedCharge.category = '';
    this.selectedCharge.subcategory = '';
    this.chargeForm.removeControl('category');
    this.chargeForm.removeControl('subcategory');
    if (this.selectedCharge.customerType !== '') {
      this.getCategories(this.selectedCharge.customerType);
    }
  }
  onCatSelect() {
    this.selectedCharge.subcategory = '';
    if (this.selectedCharge.category !== '') {
      this.getSubCategories(
        this.selectedCharge.customerType,
        this.selectedCharge.category
      );
    }
  }

  onAddCharge() {
    this.formAct = 'create';
    this.selectedCharge = {
      charge_id: '',
      project: '',
      customerType: '',
      category: '',
      subcategory: '',
      chargeAmt: 0,
    };
  }
  editCharge(chargeObj: any) {
    this.formAct = 'edit';
    this.selectedCharge = {
      charge_id: chargeObj.charges_id,
      project: chargeObj.project_id,
      customerType: chargeObj.customer_type,
      category: chargeObj.category_id,
      subcategory: chargeObj.sub_category_id,
      chargeAmt: chargeObj.charges,
    };
    this.getCategories(chargeObj.customer_type);
    this.getSubCategories(chargeObj.customer_type, chargeObj.category_id);
  }
  onCancelForm() {
    this.selectedCharge = {
      charge_id: '',
      project: '',
      customerType: '',
      category: '',
      subcategory: '',
      chargeAmt: 0,
    };
    this.catsData = [];
    this.subCatsData = [];
    this.chargeForm.reset();
  }
  submitCharge() {
    if (this.chargeForm.valid) {
      if (this.formAct === 'create') {
        let dataObj = {
          //created_by: this.appData.user_id,
          customer_type: this.selectedCharge.customerType,
          category_id: this.selectedCharge.category,
          sub_category_id: this.selectedCharge.subcategory,
          project_id: this.selectedCharge.project,
          charges: this.selectedCharge.chargeAmt,
        };
        this.authService
          .apiCommunication('addCharge', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getCharges();
              this.chargeForm.reset();
              this.closeModal.nativeElement.click();
              window.alert('Charge created successfully');
            } else {
              window.alert(responseObj['message']);
            }
          })
          .catch((error) => {});
      } else if (this.formAct === 'edit') {
        let dataObj = {
          charges_id: this.selectedCharge.charge_id,
          customer_type: this.selectedCharge.customerType,
          category_id: this.selectedCharge.category,
          sub_category_id: this.selectedCharge.subcategory,
          project_id: this.selectedCharge.project,
          charges: this.selectedCharge.chargeAmt,
        };
        this.authService
          .apiCommunication('updateCharge', dataObj)
          .then((responseObj: any) => {
            console.log(JSON.stringify(responseObj));
            if (responseObj['success']) {
              this.getCharges();
              this.chargeForm.reset();
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

  async getCharges() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getCharges', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.chargesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
}
