import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router' ;
import { AuthService } from 'src/app/shared/services/auth.service' ; 
import { State } from 'src/app/models/enums/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  @Output() sidenavStatus = new EventEmitter<boolean>();
  isOpened : boolean = false  ;
  stateEnum = State;
  state = State.home;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if(this.router.url.match(/authentication/g) !== null){
      if(this.router.url.match(/signup/g) !== null){
        this.state = State.signup;
      }
      else this.state = State.authentication;
    }
    else if(this.router.url.match(/help/g) !== null){
      this.state = State.authentication;
    }
  }

  openSideNav(){
    this.isOpened = !this.isOpened ;
    this.sidenavStatus.emit(this.isOpened);
  }

  logout(){
    this.auth.clearSession() ;  
    location.reload();
  }

  redirectToHome(){
    this.router.navigate(['home']);
  }

  redirectToHelp(){
    this.router.navigate(['help']);
  }
}
