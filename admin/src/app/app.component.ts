import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  selectedMenu = 'dashboard'
  menuData = [
    {menuTitle:'Dashboard', icon:'<i class="bi bi-house-fill"></i>', value:'dashboard'},
    {menuTitle:'Attendence', icon:'<i class="bi bi-person-check-fill"></i>', value:'attendence'},
    {menuTitle:'User Management', icon:'<i class="bi bi-people-fill"></i>', value:'users'},
    {menuTitle:'Site Management', icon:'<i class="bi bi-geo-alt-fill"></i>', value:'sites'},
    {menuTitle:'Customer Management', icon:'<i class="bi bi-person-lines-fill"></i>', value:'customers'},
    {menuTitle:'Routes Management', icon:'<i class="bi bi-signpost-2-fill"></i>', value:'routes'},
    {menuTitle:'Vehicles Management', icon:'<i class="bi bi-truck"></i>', value:'vehicles'},
    {menuTitle:'Charges', icon:'<i class="bi bi-cash-stack"></i>', value:'charges'},
    {menuTitle:'Payments', icon:'<i class="bi bi-record-btn-fill"></i>', value:'payments'},
    {menuTitle:'Complaints', icon:'<i class="bi bi-telephone-outbound-fill"></i>', value:'complaints'},
    {menuTitle:'Master Settings', icon:'<i class="bi bi-gear"></i>', value:'settings'},
  ]
  constructor(public authService:AuthServiceService, private router: Router){

    const currentURL = window.location.href;
    const urlData = currentURL.split('/');
    this.selectedMenu = urlData[urlData.length-1]
    console.log(this.selectedMenu)
  }
  onMenuClick(menuItem: any){
    this.selectedMenu = menuItem;
    this.router.navigate(['/'+menuItem]);
  }
}
