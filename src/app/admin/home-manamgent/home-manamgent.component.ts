import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home-manamgent',
  templateUrl: './home-manamgent.component.html',
  styleUrls: ['./home-manamgent.component.css']
})
export class HomeManamgentComponent implements OnInit {



  constructor(public sharedservice: SharedService, public dialog: MatDialog,public route:Router) {

  }


  UpdateHomeForm = new FormGroup({
    homeid: new FormControl(""),
    logo: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required,Validators.email]),
    phone: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    paragraph: new FormControl("", Validators.required),
    text1: new FormControl("", Validators.required)


  })

 async ngOnInit(){
  await  this.sharedservice.GetAllHome()
  this.UpdateHomeForm.patchValue(this.sharedservice.Home)
  this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

  }

  async UpdateHome(){
   await this.sharedservice.UpdateHome(this.UpdateHomeForm.value)
    this.route.navigate(["Admin/Home"])
  }

  UploadImage(Input:any){

    if (Input.files[0] != 0) {
      let UploadedImage = Input.files[0]; //ImageFile
      let formData = new FormData()   
      formData.append("fileForImage",UploadedImage)
      this.sharedservice.UploadHomeImage(formData)
    }
   
  }

}
