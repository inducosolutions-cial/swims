import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from './services/app-data.service';
import { AuthServiceService } from './services/auth-service.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('mySidenav')
  mySidenav!: ElementRef;
  @ViewChild('main')
  main!: ElementRef;
  public innerWidth: any;
  public isMenuViewSideBySide = true;
  title = 'admin';
  selectedMenu = 'dashboard';
  menuData = [
    {
      menuTitle: 'Dashboard',
      icon: '<i class="bi bi-house-fill"></i>',
      value: 'dashboard',
    },
    {
      menuTitle: 'Project Management',
      icon: '<i class="bi bi-geo-alt-fill"></i>',
      value: 'sites',
    },
    {
      menuTitle: 'User Management',
      icon: '<i class="bi bi-people-fill"></i>',
      value: 'users',
    },
    {
      menuTitle: 'Customer Management',
      icon: '<i class="bi bi-person-lines-fill"></i>',
      value: 'customers',
    },
    {
      menuTitle: 'Payments',
      icon: '<i class="bi bi-record-btn-fill"></i>',
      value: 'payments',
    },
    {
      menuTitle: 'Charges',
      icon: '<i class="bi bi-cash-stack"></i>',
      value: 'charges',
    },
    {
      menuTitle: 'Master Settings',
      icon: '<i class="bi bi-gear"></i>',
      value: 'settings',
    },
    {
      menuTitle: 'Complaints',
      icon: '<i class="bi bi-telephone-outbound-fill"></i>',
      value: 'complaints',
    },
    {
      menuTitle: 'Profile',
      icon: '<i class="bi bi-file-earmark-person"></i>',
      value: 'profile',
    },
    {
      menuTitle: 'Logout',
      icon: '<i class="bi bi-box-arrow-right"></i>',
      value: 'logout',
    },
    //{menuTitle:'Attendence', icon:'<i class="bi bi-person-check-fill"></i>', value:'attendence'},
    //{menuTitle:'Routes Management', icon:'<i class="bi bi-signpost-2-fill"></i>', value:'routes'},
    //{menuTitle:'Vehicles Management', icon:'<i class="bi bi-truck"></i>', value:'vehicles'},
  ];
  constructor(
    public authService: AuthServiceService,
    private router: Router,
    public appData: AppDataService,
    private localStore: LocalstorageService
  ) {
    const currentURL = window.location.href;
    const urlData = currentURL.split('/');
    this.selectedMenu = urlData[urlData.length - 1];
    this.authService.invalidToken.subscribe({
      next: (event: string) => {
        this.appData.currentToken = '';
        this.appData.username = '';
        this.appData.name = '';
        this.appData.isAuthenticated = false;
        this.localStore.clearInfo();
      },
    });
    this.authService.isAuthenticated.subscribe({
      next: (event: string) => {
        setTimeout(() => {
          console.log("************************************************"+window.location.href)
          const currentURL = window.location.href;
          const urlData = currentURL.split('/');
          this.selectedMenu = urlData[urlData.length - 1];
          this.onResize()
        }, 500);
      },
    });
  }

  ngOnInit() {
    if (String(window.location.href).indexOf('resetpassword') > -1) {
      this.logoutConfirmed();
      this.appData.isAuthenticated = false;
      this.appData.isResetPasswordView = true;
    } else if (this.localStore.localData) {
      this.appData.currentToken = this.localStore.localData.token;
      this.appData.isAuthenticated = true;
      this.appData.isResetPasswordView = false;
      this.appData.username = this.localStore.localData.username;
      this.appData.name = this.localStore.localData.name;
      this.appData.user_id = this.localStore.localData.user_id;
      console.log('UserID', this.appData.user_id);
      this.appData.role_id = this.localStore.localData.role_id;
      this.appData.corporate_code = this.localStore.localData.corporate_code;
      if (window.location.pathname.split('/')[1] === '') {

      }
      setTimeout(() => {
        this.onResize()
      }, 200);
    }
  }
  onResize() {
    this.innerWidth =  window.innerWidth;
    this.isMenuViewSideBySide = false;
    if(this.innerWidth < 450){
      console.log("100%")
      this.mySidenav.nativeElement.style.width = "100%"
      this.closeNav()
    }else if(this.innerWidth > 450 && this.innerWidth < 760){
      console.log("70%")
      this.closeNav()
      this.mySidenav.nativeElement.style.width = "70%"
    }else if(this.innerWidth > 760 && this.innerWidth < 820){
      console.log("50%")
      this.closeNav()
      this.mySidenav.nativeElement.style.width = "50%"
    }else if(this.innerWidth > 820 && this.innerWidth < 1024){
      console.log("30%")
      this.closeNav()
      this.mySidenav.nativeElement.style.width = "30%"
    }else{
      console.log("25%")
      this.isMenuViewSideBySide = true;
      this.mySidenav.nativeElement.style.width = "300px"
      this.main.nativeElement.style.marginLeft = "300px";
      this.openNav()
    }
    console.log("Resize - "+this.innerWidth)
  }
   openNav() {
    this.mySidenav.nativeElement.style.display = "block";
    if(this.isMenuViewSideBySide === true){
      this.main.nativeElement.style.marginLeft = "300px";
    }else{
      this.main.nativeElement.style.marginLeft = "0";
    }
  }
  closeNav() {
    this.mySidenav.nativeElement.style.display = "none";
    if(this.isMenuViewSideBySide === true){
      this.main.nativeElement.style.marginLeft = "300px";
    }else{
      this.main.nativeElement.style.marginLeft = "0";
    }
  }
  onMenuClick(menuItem: any) {
    if(menuItem !== 'logout'){
      this.selectedMenu = menuItem;
      this.router.navigate(['/' + menuItem]);
      if(this.isMenuViewSideBySide === false){
        this.closeNav()
      }
    }else{
      if(confirm("Are you sure you want to logout")) {
       this.logoutConfirmed()
      }
    }
  }
  logoutConfirmed() {
    console.log('Logging Out');
    if (this.appData.role_id !== 0) {
      var dataObj = {
        user_id: this.appData.user_id,
      };
      this.authService
        .apiCommunication('logout', dataObj)
        .then((responseObj: any) => {
          console.log(JSON.stringify(responseObj));
          if (responseObj['success']) {
            this.appData.currentToken = '';
            this.appData.username = '';
            this.appData.name = '';
            this.appData.isAuthenticated = false;
            this.localStore.clearInfo();
            this.router.navigate(['/']);
          } else {
            console.log('Error ', responseObj['data'].error);
          }
        })
        .catch((error: any) => {
          console.log(
            'Error ',
            'Some problem while trying to server. Please try again'
          );
        });
    }
  }
}
