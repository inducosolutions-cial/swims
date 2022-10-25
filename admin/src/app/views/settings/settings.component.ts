import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  public statesData = [];
  public citiesData = [];
  public wardsData = [];
  public categoriesData = [];
  public subCategoriesData = [];
  public projectsData = [];
  public userRolesData = [];
  public customerTypesData = [];

  public selectedState:any = null;
  public selectedCity:any = null;
  public selectedWard:any = null;
  public selectedCategory:any = null;
  public selectedSubCategory:any = null;
  public selectedProject:any = null;
  public selectedCustomerType:any = null;
  public selectedUserRole:any = null;

  public newState:string = '';
  public newCity:string = '';
  public newWard:string = '';
  public newCategory:string = '';
  public newSubCategory:string = '';
  public newProject:string = '';
  public newUserRole:string = '';
  public newCustomerType:string = '';

  public editObj:any=null;
  public editType = '';
  public editValue = '';

  public showStateLoader = false;
  public showCityLoader = false;
  public showWardLoader = false;
  public showCatLoader = false;
  public showSubCatLoader = false;
  public showProjectLoader = false;
  public showCustomerTypesLoader = false;
  public showUserRoleLoader = false;

  constructor(fb: FormBuilder, private authService: AuthServiceService,
    public appData: AppDataService,) {
  }

  ngOnInit(): void {
    this.getStates()
  }

  onTabSelect(typeStr:any){
    if(typeStr === 'state'){
      this.getStates();
    }else if(typeStr === 'projects'){
     this.getProjects();
    }else if(typeStr=== 'customertype'){
      this.getCustomerTypes();
    }else if(typeStr=== 'category'){
      this.getCategories();
    }else if(typeStr=== 'userroles'){
      this.getUserRoles();
    }
  }
  showEditModal(editObj:any, typeStr:any){
    console.log("Open Modaal window");
    this.editObj = editObj;
    this.editType = typeStr
    if(this.editType === 'state'){
      this.editValue = this.editObj.state_name;
    }else if(this.editType === 'city'){
      this.editValue = this.editObj.city_name;
    }else if(this.editType === 'ward'){
      this.editValue = this.editObj.ward_name;
    }else if(this.editType === 'category'){
      this.editValue = this.editObj.category_name;
    }else if(this.editType === 'subcategory'){
      this.editValue = this.editObj.sub_category_name;
    }else if(this.editType === 'customertype'){
      this.editValue = this.editObj.customer_type;
    }else if(this.editType === 'project'){
      this.editValue = this.editObj.project_type_name;
    }else if(this.editType === 'userRole'){
      this.editValue = this.editObj.role_name;
    }
  }
  editSubmit(){
    if(this.editType === 'state'){
      this.editState()
    }else if(this.editType === 'city'){
      this.editCity()
    }else if(this.editType === 'ward'){
      this.editWard()
    }else if(this.editType === 'category'){
      this.editCategory()
    }else if(this.editType === 'subcategory'){
      this.editSubCategory()
    }else if(this.editType === 'customertype'){
      this.editCustomerType()
    }else if(this.editType === 'project'){
      this.editProject()
    }else if(this.editType === 'userRole'){
      this.editUserRole()
    }
  }

  onUserRoleSelect(roleObj:any){
    this.selectedUserRole = roleObj;
    this.getUserRoles();
  }
  async getUserRoles(){
    this.showUserRoleLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('userRoles', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showUserRoleLoader = false;
        if (responseObj['success']) {
          this.userRolesData = responseObj['data']
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createUserRole(){
    if(this.newUserRole.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        role_name: this.newUserRole
      };
      this.authService
        .apiCommunication('addUserRole', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getUserRoles();
            this.newUserRole = '';
            window.alert("New User Role was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editUserRole(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        role_id: this.editObj.role_id,
        role_name: this.editValue
      };
      this.authService
        .apiCommunication('updateUserRole', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getUserRoles();
            this.newUserRole = '';
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteUserRole(){

  }

  onStateSelect(stateObj:any){
    console.log('state')
    this.selectedState = stateObj;
    this.getCities();
  }
  async getStates(){
    this.showStateLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getStates', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showStateLoader = false;
        if (responseObj['success']) {
          this.statesData = responseObj['data']
          if(this.statesData.length > 0){
            this.selectedState = this.statesData[0]
            this.getCities();
          }
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createState(){
    if(this.newState.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_name: this.newState
      };
      this.authService
        .apiCommunication('addState', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getStates();
            this.newState = '';
            window.alert("New State was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editState(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_id: this.editObj.state_id,
        state_name: this.editValue
      };
      this.authService
        .apiCommunication('updateState', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getStates();
            this.newState = '';
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteState(){

  }

  onCitySelect(cityObj:any){
    this.selectedCity = cityObj;
    this.getWards();
  }
  async getCities(){
    this.showCityLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
      state_id:this.selectedState.state_id
    };
    this.authService
      .apiCommunication('getCities', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showCityLoader = false;
        if (responseObj['success']) {
          this.citiesData = responseObj['data']
          if(this.citiesData.length > 0){
            this.selectedCity = this.citiesData[0]
            this.getWards();
          }
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createCity(){
    if(this.newCity.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_id: this.selectedState.state_id,
        city_name: this.newCity
      };
      this.authService
        .apiCommunication('addCity', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getCities();
            this.newCity = '';
            window.alert("New City was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editCity(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_id: this.editObj.state_id,
        city_id: this.editObj.city_id,
        city_name: this.editValue
      };
      this.authService
        .apiCommunication('updateCity', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getCities();
            this.newCity = '';
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteCity(){

  }

  onWardSelect(wardObj:any){
    this.selectedWard = wardObj
  }
  async getWards(){
    this.showWardLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
      state_id:this.selectedState.state_id,
      city_id:this.selectedCity.city_id,
    };
    this.authService
      .apiCommunication('getWards', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showWardLoader = false;
        if (responseObj['success']) {
          this.wardsData = responseObj['data']
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createWard(){
    if(this.newWard.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_id: this.selectedState.state_id,
        city_id:this.selectedCity.city_id,
        ward_name: this.newWard
      };
      this.authService
        .apiCommunication('addWard', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getWards();
            this.newWard = '';
            window.alert("New ward was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editWard(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        state_id: this.editObj.state_id,
        city_id: this.editObj.city_id,
        ward_id: this.editObj.ward_id,
        ward_name: this.editValue
      };
      this.authService
        .apiCommunication('updateWard', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getWards();
            this.newWard = '';
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteWard(){

  }



  onProjectSelect(projectObj:any){
    this.selectedProject = projectObj
  }
  async getProjects(){
    this.showProjectLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProjectTypes', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showProjectLoader = false;
        if (responseObj['success']) {
          this.projectsData = responseObj['data']
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createProject(){
    if(this.newProject.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        project_type_name: this.newProject
      };
      this.authService
        .apiCommunication('addProjectType', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getProjects();
            this.newProject = '';
            window.alert("New project was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editProject(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        project_type_id: this.editObj.project_type_id,
        project_type_name: this.editValue
      };
      this.authService
        .apiCommunication('updateProjectType', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getProjects();
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteProject(){

  }

  onCustomerTypeSelect(projectObj:any){
    this.selectedCustomerType = projectObj
    this.getCategories();
  }
  async getCustomerTypes(){
    this.showCustomerTypesLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getCustomerTypes', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showCustomerTypesLoader = false;
        if (responseObj['success']) {
          this.customerTypesData = responseObj['data']
          if(this.customerTypesData.length > 0){
            this.selectedCustomerType = this.customerTypesData[0]
            this.getCategories();
          }
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createCustomerType(){
    if(this.newCustomerType.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type: this.newCustomerType
      };
      this.authService
        .apiCommunication('addCustomerType', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getCustomerTypes();
            this.newCustomerType = '';
            window.alert("New Customer Type created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editCustomerType(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type_id: this.editObj.customer_type_id,
        customer_type: this.editValue
      };
      this.authService
        .apiCommunication('updateCustomerType', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getCustomerTypes();
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteCustomerType(){

  }

  onCategorySelect(catObj:any){
    this.selectedCategory = catObj
    this.getSubCategories()
  }
  async getCategories(){
    this.showCatLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
      customer_type_id: this.selectedCustomerType.customer_type_id,
    };
    this.authService
      .apiCommunication('getCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showCatLoader = false;
        if (responseObj['success']) {
          this.categoriesData = responseObj['data']
          if(this.categoriesData.length > 0){
            this.selectedCategory = this.categoriesData[0]
            this.getSubCategories();
          }
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createCategory(){
    if(this.newCategory.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type_id: this.selectedCustomerType.customer_type_id,
        category_name: this.newCategory
      };
      this.authService
        .apiCommunication('addCategory', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getCategories();
            this.newCategory = '';
            window.alert("New Category was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editCategory(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type_id: this.selectedCustomerType.customer_type_id,
        category_id: this.editObj.category_id,
        category_name: this.editValue
      };
      this.authService
        .apiCommunication('updateCategory', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getCategories();
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteCategory(){

  }

  onSubCategorySelect(subObj:any){
    this.selectedSubCategory = subObj
  }
  async getSubCategories(){
    this.showSubCatLoader = true;
    var dataObj = {
      user_id: this.appData.user_id,
      customer_type_id: this.selectedCustomerType.customer_type_id,
      category_id:this.selectedCategory.category_id,
    };
    this.authService
      .apiCommunication('getSubCategories', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        this.showSubCatLoader = false;
        if (responseObj['success']) {
          this.subCategoriesData = responseObj['data']
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async createSubCategory(){
    if(this.newSubCategory.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type_id: this.selectedCustomerType.customer_type_id,
        category_id: this.selectedCategory.category_id,
        sub_category_name: this.newSubCategory
      };
      this.authService
        .apiCommunication('addSubCategory', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.getSubCategories();
            this.newSubCategory = '';
            window.alert("New SubCategory was created successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async editSubCategory(){
    if(this.editValue.trim() !== ''){
      var dataObj = {
        user_id: this.appData.user_id,
        customer_type_id: this.selectedCustomerType.customer_type_id,
        category_id: this.selectedCategory.category_id,
        sub_category_id: this.editObj.sub_category_id,
        sub_category_name: this.editValue
      };
      this.authService
        .apiCommunication('updateSubCategory', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getSubCategories();
            this.editValue = '';
            window.alert("Updated successfully");
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  async deleteSubCategory(){

  }

}
