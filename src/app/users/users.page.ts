import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  currentView = 'grid';
  formObj = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    address: '',
    projects: '',
    sitelocation: '',
    status: 'active'
  }
  constructor() { }

  ngOnInit() {

  }
  addUserClick() {
    this.currentView = 'form';
  }
  cancelUser() {
    this.currentView = 'grid';
  }
  addUser() {
    this.currentView = 'grid';
  }
  editUser() {
    this.currentView = 'form';
  }
}
