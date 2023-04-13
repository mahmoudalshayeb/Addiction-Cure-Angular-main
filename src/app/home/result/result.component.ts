import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/doctors.service';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
constructor(public patientService:PatientService , public sharedService:SharedService,private route:Router,public doctorService:DoctorsService){}

async ngOnInit(){
 await this.patientService.getResultByPatid(this.sharedService.PatientById.patientid)
}

numberOfTest(numberoftest:number ,Resulttestid:number){
this.sharedService.SetTestNumber(numberoftest ,Resulttestid)
this.route.navigate(["/Quiz"]);
}

answer(numberoftest:number,patientid:number){
  this.doctorService.answer(patientid,numberoftest)
  this.route.navigate(["/answer"])
}
}
