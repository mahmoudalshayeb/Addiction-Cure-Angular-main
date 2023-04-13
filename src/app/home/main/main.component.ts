import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
 
 @Output() sendvalue = new EventEmitter()

  constructor(public sharedService:SharedService,public adminservice: AdminService,private spinner: NgxSpinnerService ,private toster:ToastrService,public patientService : PatientService)
  {

  }
  x:any = localStorage.getItem("loginid")

 async ngOnInit() {
  this.sharedService.GetAboutusByid(66)
  await this.sharedService.GetAllTestemonial()

if(this.x!=null){
await this.sharedService.GetPatientById(this.x)
}else{
  this.sharedService.PatientById.patientid=null
}

  
  }
 

  CreateContactUsForm = new FormGroup({

    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required,Validators.email]),
    subject: new FormControl("", Validators.required),
    mesg: new FormControl("", Validators.required),


  })

  SendContact() {
    this.adminservice.createContactUs(this.CreateContactUsForm.value)
  }




  //Error messages
   A? :boolean;
  ShowAErrorMessage() {
    this.A = true;
  }
  B? :boolean;
  ShowBErrorMessage() {
    this.B = true;
  }
  C? :boolean;
  ShowCErrorMessage() {
    this.C = true;
  }
  D? :boolean;
  ShowDErrorMessage() {
    this.D = true;
  }
  E? :boolean;
  ShowEErrorMessage() {
    this.E = true;
  }
 

  Wtostar(){
    this.toster.toastrConfig.positionClass = 'toast-bottom-left';
    this.toster.warning("Please Login or Sign up For Take Test")
  }
  
}
