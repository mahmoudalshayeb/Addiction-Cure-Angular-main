import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { DoctorsService } from 'src/app/doctors.service';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';
  
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
constructor(public patientService:PatientService ,public adminservice:AdminService, public doctorService:DoctorsService , public sharedService : SharedService,private route:Router){}
 
x= localStorage.getItem("loginid")?.toString()
async ngOnInit(){
  if(this.sharedService.DoctorByLoginId==null){
  await  this.sharedService.GetDoctorByLogInId(this.x)
  this.doctorService.getpatientbydoctorid(this.sharedService.DoctorByLoginId.doctodid)
  }else{
 this.doctorService.getpatientbydoctorid(this.sharedService.DoctorByLoginId.doctodid)}
}
GetById(id:number)
{
  this.patientService.GetPatientBypateinId(id)
}




retrive(id:number , cat:number){
this.sharedService.retrive(id,cat)
this.route.navigate(["Doctor/QuestionsDoctor"])
}
}
