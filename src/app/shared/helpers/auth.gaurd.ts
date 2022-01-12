import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    if (this.auth.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/authentication/login']);
    return false;
  }
}