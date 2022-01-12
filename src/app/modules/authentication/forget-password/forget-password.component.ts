import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit{

  emailForm: FormGroup;
  showForm: boolean = true;

  constructor(private auth: AuthService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email : [null, [Validators.required, Validators.email]]
    });
  }
  
  sendMail(form){
    this.auth.sendMail(form.email)
    .subscribe(() => {});
    this.showForm = false ;
  }
}