import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(public shaerdService: SharedService, private toastr: ToastrService, private spinner: NgxSpinnerService, public route: Router,public patientService : PatientService) { }

  RegisterForm = new FormGroup({

    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    categoryid: new FormControl("", [Validators.required]),

  })

  async Register() {
    
    let data2:any={
      firstname:this.RegisterForm.value.firstname,
      lastname:this.RegisterForm.value.lastname,
      username:this.RegisterForm.value.username,
      email:this.RegisterForm.value.email,
      password:this.RegisterForm.value.password,
      categoryid:parseInt(this.RegisterForm.value.categoryid?.slice(0,3)??''),
    }
    console.log(data2);
    
    let data = this.RegisterForm.value
   const categoryId = parseInt(this.RegisterForm.value.categoryid?.slice(0,3)??'');
      
    
    await this.shaerdService.RegisterPatient(data2)
    this.toastr.success("Success Sign Up")
    this.route.navigate(["/Auth/SignIn"])
}
  ngOnInit() {
    this.shaerdService.GetCategory()
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

  

  UploadImage(input: any) // <input>
  {
    if (input.files.length != 0) {
      let uploadedFile = input.files[0] // imagefile 
      let formData = new FormData()
      formData.append('file', uploadedFile)
      this.shaerdService.UploadImage(formData)
    }
  }
}
