import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-about-us-mange',
  templateUrl: './about-us-mange.component.html',
  styleUrls: ['./about-us-mange.component.css']
})
export class AboutUsMangeComponent {

  constructor(public sharedservice: SharedService, public dialog: MatDialog, public route: Router) {

  }

  UpdateAboutUsForm = new FormGroup({
    id: new FormControl(""),
    //image: new FormControl(''),
    paragraph1: new FormControl("", Validators.required),
    paragraph2: new FormControl("", Validators.required)

  })

  async ngOnInit() {
    await this.sharedservice.GetAboutusByid(66)
    var a:any= localStorage.getItem('AboutById')
    a=JSON.parse(a)
    this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

    this.UpdateAboutUsForm.patchValue(a)
    
    
    
  }
  async ngOnChanges(){
    // var a:any= localStorage.getItem('AboutById')
    // a=JSON.parse(a)
    // this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))
    // this.UpdateAboutUsForm.patchValue(a)
    await this.sharedservice.GetAboutusByid(66)
    var a:any= localStorage.getItem('AboutById')
    a=JSON.parse(a)
    this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

    this.UpdateAboutUsForm.patchValue(a)
    // this.UpdateAboutUsForm.controls['paragraph1'].setValue(a.paragraph1)
  }
  async UpdateAboutUs() {
    await this.sharedservice.UpdateAboutUs(this.UpdateAboutUsForm.value);
    this.route.navigate(["Admin/AboutUs"])
  }
  UploadImage(Input: any) {
    let UploadedImage = Input.files[0];
    let formData = new FormData();
    formData.append("FileforImage", UploadedImage)
    this.sharedservice.UploadAboutUsImage(formData)

  }

}
