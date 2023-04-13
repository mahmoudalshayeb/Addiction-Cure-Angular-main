import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public shaerdService: SharedService, private toastr: ToastrService, private spinner: NgxSpinnerService,public route:Router) { }

  LoginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    Login() {
      this.shaerdService.Login(this.LoginForm.value)
      
    }
  

    
    A?: boolean
    ShowAError() {
      this.A = true;
    }
    B?: boolean
    ShowBError() {
      this.B = true;
    }
    C?: boolean
    ShowCError() {
      this.C = true;
    }
  
    D?: boolean
    ShowDError() {
      this.D = true;
    }
  
    E?: boolean
    ShowEError() {
      this.E = true;
    }
    H?: boolean
    ShowHError() {
      this.H = true;
    }
    F?: boolean
    ShowFError() {
      this.F = true;
    }








}

