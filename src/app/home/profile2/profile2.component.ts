import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';
import { PaymentTestComponent } from '../payment-test/payment-test.component';
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component {
 
  constructor(public patientService: PatientService, public sharedservice: SharedService , private dialog:Dialog ,public adminService:AdminService) { }

  UpdateProfile = new FormGroup
    (
      {
        imagename: new FormControl(""),
        patientid: new FormControl(''),
        firstname: new FormControl("", [Validators.required]),
        lastname: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        CurrentPassword : new FormControl(""),

      })

      x:any = localStorage.getItem("loginid")
  async ngOnInit() {
    
    if(this.x!=null){
      await this.sharedservice.GetPatientById(this.x)
      }else{
        this.sharedservice.PatientById.patientid=null
      }
      this.sharedservice.GetrequstBypatid(this.sharedservice.PatientById.patientid)
      this.adminService.GetPaymentsbyPatid(this.sharedservice.PatientById.patientid)


    this.UpdateProfile.patchValue({
      patientid: this.sharedservice.PatientById.patientid,
      firstname: this.sharedservice.PatientById.firstname,
      lastname: this.sharedservice.PatientById.lastname,
      username: this.sharedservice.PatientById.username,
      email: this.sharedservice.PatientById.email,
      imagename: this.sharedservice.PatientById.imagename,
      password: this.sharedservice.PatientById.password

  
    })
   
  }

  
  Current=true;
  CheckPassword()
  {
   if ( this.UpdateProfile.controls["CurrentPassword"].value == this.sharedservice.PatientById.password) 
   {
    this.Current=false;
   }
  }
    





  
  
  UploadImage(Input: any) {

    if (Input.files[0] != 0) {
      let UploadedImage = Input.files[0]; //ImageFile
      let formData = new FormData()
      formData.append("fileForImage", UploadedImage)
      this.patientService.UploadImage(formData)
    }

  }


  async UpdatePatient() {
   await this.patientService.UpdatePatient(this.UpdateProfile.value)
    this.sharedservice.GetPatientById(this.sharedservice.PatientById.patientid)
    window.location.reload()

  }



  ReturnOldValue() {

    this.UpdateProfile.patchValue({
      patientid: this.sharedservice.PatientById.patientid,
      firstname: this.sharedservice.PatientById.firstname,
      lastname: this.sharedservice.PatientById.lastname,
      username: this.sharedservice.PatientById.username,
      email: this.sharedservice.PatientById.email,
      imagename: this.sharedservice.PatientById.imagename,
      password: this.sharedservice.PatientById.password

    })
  }

  OpenDialog() {
      this.dialog.open(PaymentTestComponent)
  }


  B?: boolean;
  ShowBErrorMessage() {
    this.B = true;
  }

  C?: boolean;
  ShowCErrorMessage() {
    this.C = true;
  }

}
