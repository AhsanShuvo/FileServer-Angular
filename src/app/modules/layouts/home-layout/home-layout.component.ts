import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit{
  isSidenavOpened : boolean = false;
    
  constructor() {}
  
  ngOnInit(): void {}

  toggleSidenav(isSelected: boolean){
    this.isSidenavOpened = isSelected;
  }
}