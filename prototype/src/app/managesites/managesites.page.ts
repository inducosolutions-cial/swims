import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managesites',
  templateUrl: './managesites.page.html',
  styleUrls: ['./managesites.page.scss'],
})
export class ManagesitesPage implements OnInit {
  currentView = 'grid';
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
