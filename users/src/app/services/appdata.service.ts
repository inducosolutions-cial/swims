/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppdataService {
  public isAuthenticated: boolean = false;
  public currentMenu = 'profileMenu';
  public userIP = '';
  public userDevice = '';
  public userData:any = {};
  public userWalletBal: any;
  public userHoldBal: any;
  public servicesInfo: any = [];
  public dashboardMenu = [];
  public profileData:any = {};
  public rawdashboardMenu = [
    {
      title: 'Dashboard',
      url: '/tabs/dashboard/',
      icon: '/assets/icon/dashboard.png',
      roles: [1, 2, 3, 4],
      children: null,
    },
    /* {
      title : "User Management",
      url   : "/tabs/dashboard/userlist/admin",
      icon  : "/assets/icon/usermanage.png",
      roles : [1, 2, 3],
      children: [
        {
          title : "Admin List",
          url   : "/tabs/dashboard/userlist/admin",
          icon  : "/assets/icon/rightarrow.png",
          children: null,
          roles : [1]
        },
        {
          title : "Distributors List",
          url   : "/tabs/dashboard/userlist/distributors",
          icon  : "/assets/icon/rightarrow.png",
          children: null,
          roles : [1, 2]
        },
        {
          title : "Retailers List",
          url   : "/tabs/dashboard/userlist/retailers",
          icon  : "/assets/icon/rightarrow.png",
          children: null,
          roles : [1, 2, 3]
        }
      ]
    },*/
    {
      title: 'Funds',
      url: '/tabs/dashboard/topuprequests/',
      icon: '/assets/icon/funds.png',
      roles: [1, 2, 3, 4],
      children: [
        {
          title: 'Top Requests',
          url: '/tabs/dashboard/topuprequests/',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'My Top-Up',
          url: '/tabs/dashboard/mytopup/',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
        {
          title: 'Credit Topup',
          url: '/tabs/dashboard/topups/credit',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3],
          children: null,
        },
        {
          title: 'Debit Topup',
          url: '/tabs/dashboard/topups/debit',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3],
          children: null,
        },
        {
          title: 'Topup History',
          url: '/tabs/dashboard/topuphistory/',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3],
          children: null,
        },
      ],
    },
    /*{
      title: 'Assign Services',
      url: '/tabs/dashboard/commissions/superadmin',
      icon: '/assets/icon/services.png',
      roles: [1, 2, 3],
      children: [
        {
          title: 'Admin',
          url: '/tabs/dashboard/commissions/admin',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
        {
          title: 'Distributors',
          url: '/tabs/dashboard/commissions/distributors',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2],
          children: null,
        },
        {
          title: 'Retailers',
          url: '/tabs/dashboard/commissions/retailers',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3],
          children: null,
        },
      ],
    },*/
    {
      title: 'Reports',
      url: '/tabs/dashboard/reports',
      icon: '/assets/icon/report.png',
      roles: [1, 2, 3, 4],
      children: [
        {
          title: 'AEPS History',
          url: '/tabs/dashboard/reports/aeps',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'DMT History',
          url: '/tabs/dashboard/reports/dmt',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Recharge History',
          url: '/tabs/dashboard/reports/recharge',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'BBPS History',
          url: '/tabs/dashboard/reports/bbps',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Aadhar Pay History',
          url: '/tabs/dashboard/reports/aadharpay',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Cashout History',
          url: '/tabs/dashboard/reports/cashout',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Credit Card History',
          url: '/tabs/dashboard/reports/cc',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Cashout History',
          url: '/tabs/dashboard/reports/cashout',
          icon: '/assets/icon/rightarrow.png',
          roles: [4],
          children: null,
        },
        {
          title: 'UPI Histroy',
          url: '/tabs/dashboard/reports/upi',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'Ledger',
          url: '/tabs/dashboard/reports/ledger',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'TDS Report',
          url: '/tabs/dashboard/reports/tds',
          icon: '/assets/icon/rightarrow.png',
          roles: [1, 2, 3, 4],
          children: null,
        },
        {
          title: 'GST Report',
          url: '/tabs/dashboard/reports/gst',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
      ],
    },
    {
      title: 'Settings',
      url: '',
      icon: '/assets/icon/services.png',
      roles: [1],
      children: [
        {
          title: 'Settings',
          url: '/tabs/dashboard/settings',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
        {
          title: 'Notifications',
          url: '/tabs/dashboard/notifications',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
        {
          title: 'Commisions',
          url: '/tabs/dashboard/commissions/common',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
        {
          title: 'Charges',
          url: '/tabs/dashboard/charges',
          icon: '/assets/icon/rightarrow.png',
          roles: [1],
          children: null,
        },
      ],
    },
    {
      title: 'Compliance',
      url: '/compliance',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/complaince.png',
      children: null,
    },
    {
      title: 'Logout',
      url: '/logout',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/logout.png',
      children: null,
    },
  ];
  public profileMenu = [
    {
      title: 'Profile',
      url: '/tabs/profile/',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/profile.png',
    },
    {
      title: 'My Banks',
      url: '/tabs/profile/bankdetails',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/bankdetails.png',
    },
    {
      title: 'Login History',
      url: '/tabs/profile/loginhistory',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/bankdetails.png',
    },
    {
      title: 'Change Password',
      url: '/tabs/profile/changepassword',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/changepassword.png',
    },
    {
      title: 'Compliance',
      url: '/compliance',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/complaince.png',
      children: null,
    },
    {
      title: 'Logout',
      url: '/logout',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/logout.png',
    },
  ];
  public homeMenu = [
    {
      title: 'Home',
      url: '/tabs/home/',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/profile.png',
    },
    {
      title: 'Compliance',
      url: '/compliance',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/complaince.png',
      children: null,
    },
    {
      title: 'Logout',
      url: '/logout',
      roles: [1, 2, 3, 4],
      icon: '/assets/icon/logout.png',
    },
  ];
  public userProfile: any;
  constructor() {}
  validateMenus() {
    this.dashboardMenu = [];
    for (let menuItem of this.rawdashboardMenu) {
      if (menuItem.roles.indexOf(this.userProfile['role_id']) >= 0) {
        if (menuItem.children === null) {
          this.dashboardMenu.push(menuItem);
        } else {
          var childrenData = [];
          for (let subMenuItem of menuItem['children']) {
            if (subMenuItem.roles.indexOf(this.userProfile['role_id']) >= 0) {
              childrenData.push(subMenuItem);
            }
          }
          if (childrenData.length === 0) {
            menuItem['children'] = null;
          } else {
            menuItem['children'] = childrenData;
          }
          this.dashboardMenu.push(menuItem);
        }
      }
    }
  }
}
