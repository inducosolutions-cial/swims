import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  public stateForm: any;
  public categoryForm: any;
  public statesData = [{name:'Telangana', id:1}, {name:'Andhra Pradesh', id:2}];
  public citiesData = [];
  public wardsData = [];
  public categoriesData = [];
  public subCategoriesData = [];

  public selectedState:any = {name:'Telangana', id:1};
  public selectedCity:any = null;
  public selectedWard:any = null;
  public selectedCategory:any = null;
  public selectedSubCategory:any = null;

  public newState:string = '';
  public newCity:string = '';
  public newWard:string = '';
  public newCategory:string = '';
  public newSubCategory:string = '';

  constructor(fb: FormBuilder) {
  }

  ngOnInit(): void {}


  showEditModal(){
    console.log("Open Modaal window")
  }
  editModal(){
    this.closeModal.nativeElement.click();
  }

  onStateSelect(stateObj:any){
    console.log('state')
    this.selectedState = stateObj
  }
  async getStates(){

  }
  async createState(){

  }
  async editState(){

  }
  async deleteState(){

  }

  onCitySelect(cityObj:any){
    this.selectedCity = cityObj
  }
  async getCities(){

  }
  async createCity(){

  }
  async editCity(){

  }
  async deleteCity(){

  }

  onWardSelect(wardObj:any){
    this.selectedWard = wardObj
  }
  async getWards(){

  }
  async createWard(){

  }
  async editWard(){

  }
  async deleteWard(){

  }

  onCategorySelect(wardObj:any){
    this.selectedWard = wardObj
  }
  async getCategories(){

  }
  async createCategory(){

  }
  async editCategory(){

  }
  async deleteCategory(){

  }

  onSubCategorySelect(wardObj:any){
    this.selectedWard = wardObj
  }
  async getSubCategories(){

  }
  async createSubCategory(){

  }
  async editSubCategory(){

  }
  async deleteSubCategory(){

  }

}
