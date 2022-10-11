import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getAuthStatus() === true) {
      this.router.navigate(['/']);
    }
  }
  forgotAlertPrompt() {}

  navigateToResetPassword() {
    this.router.navigate(['resetpassword']);
  }
}
