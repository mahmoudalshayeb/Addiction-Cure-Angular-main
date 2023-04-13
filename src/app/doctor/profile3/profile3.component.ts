import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-profile3',
  templateUrl: './profile3.component.html',
  styleUrls: ['./profile3.component.css']
})
export class Profile3Component implements OnInit{
  constructor(public sharedservice: SharedService, public adminService: AdminService) { 

      
  }

  UpdateProfile = new FormGroup({
    image : new FormControl(''),
    doctodid: new FormControl(''),
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required,Validators.minLength(6)]),
    email: new FormControl("", [Validators.required,Validators.email]),
    CurrentPassword : new FormControl(""),
    categoryid : new FormControl(''),
    loginid : new FormControl(''),
    roleid : new FormControl(''),
    level1 : new FormControl("")

  })
  x:any = localStorage.getItem("loginid")
   async ngOnInit() {

    if(this.x!=null){
      await this.sharedservice.GetDoctorByLogInId(this.x)
      }else{
        this.sharedservice.DoctorByLoginId.doctodid=null
      }



   this.UpdateProfile.patchValue({
    doctodid : this.sharedservice.DoctorByLoginId.doctodid,
    firstname : this.sharedservice.DoctorByLoginId.firstname,
    lastname:this.sharedservice.DoctorByLoginId.lastname,
    username: this.sharedservice.DoctorByLoginId.username,
    email:this.sharedservice.DoctorByLoginId.email,
    categoryid : this.sharedservice.DoctorByLoginId.categoryid,
    loginid : this.sharedservice.DoctorByLoginId.loginid,
    roleid :this.sharedservice.DoctorByLoginId.roleid,
    image:this.sharedservice.DoctorByLoginId.imagename,
    level1:this.sharedservice.DoctorByLoginId.level1,
    password: this.sharedservice.DoctorByLoginId.password

  })
    
  }

  
  
Current=true;
CheckPassword()
{
 if ( this.UpdateProfile.controls["CurrentPassword"].value == this.sharedservice.DoctorByLoginId.password) 
 {
  this.Current=false;
 }
}
  




 async UpdateAdmin(){
   await this.adminService.UpdateDoctor(this.UpdateProfile.value)
    this.sharedservice.GetDoctorByLogInId(this.x)

  }


  
  UploadImage(Input:any){

    if (Input.files[0] != 0) {
      let UploadedImage = Input.files[0]; //ImageFile
      let formData = new FormData()   
      formData.append("fileForImage",UploadedImage)
      this.sharedservice.UploadImage(formData)
    }
   
  }


  ReturnOldValue(){
    
   this.UpdateProfile.patchValue({
    doctodid : this.sharedservice.DoctorByLoginId.doctodid,
    firstname : this.sharedservice.DoctorByLoginId.firstname,
    lastname:this.sharedservice.DoctorByLoginId.lastname,
    username: this.sharedservice.DoctorByLoginId.username,
    email:this.sharedservice.DoctorByLoginId.email,
    categoryid : this.sharedservice.DoctorByLoginId.categoryid,
    loginid : this.sharedservice.DoctorByLoginId.loginid,
    roleid :this.sharedservice.DoctorByLoginId.roleid,
    image:this.sharedservice.DoctorByLoginId.imagename,
    level1:this.sharedservice.DoctorByLoginId.level1,
    password : ""
    
  })
  }



  
  B? :boolean;
  ShowBErrorMessage() {
    this.B = true;
  }
  
  C? :boolean;
  ShowCErrorMessage() {
    this.C = true;
  }


}
  