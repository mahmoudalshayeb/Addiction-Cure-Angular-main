import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DoctorsService } from 'src/app/doctors.service';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';
import { PaymentTestComponent } from '../payment-test/payment-test.component';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
  
export class TestComponent {
  constructor(public sharedService: SharedService, public patientService: PatientService, public doctorService: DoctorsService, private route: Router, public dialog: MatDialog,public adminService:AdminService) { }

  @ViewChild("paymentTest") paymentx: any

  x: any = localStorage.getItem("loginid")
  Amount: number = 0;
  async ngOnInit() {
    await this.sharedService.GetPatientById(this.x)
    await this.patientService.GetQuastionByCategoryId(this.sharedService.PatientById.categoryid)
    let x: number = parseInt(this.sharedService.PatientById.level1) * 5;
    this.Amount = parseInt(this.sharedService.PatientById.level1) * 30 + 50;
    this.patientService.getResultByPatid(this.sharedService.PatientById.patientid)
  }
  zero = "no"
  one = "yes"

  currentQuestionIndex = 0;
  selectedAnswer = 0;
  score: any = 0;

  next(id: number) {
    if (this.selectedAnswer === 1) {
      this.score++;
    }
    this.currentQuestionIndex++;
    let test = {
      status: this.selectedAnswer,
      patientid: this.sharedService.PatientById.patientid,
      quastionid: id,
      testdate: new Date(),
      testnumber: 1
    }
    this.patientService.CreateTest(test)
    this.selectedAnswer = 0;
  }


 async PatinetLevel() {
    if (this.score != 0) {
      this.patientService.UpdateLevel(this.sharedService.PatientById.patientid, this.score.toString())
      console.log(this.patientService.ResultByPatid);
      
      if(this.patientService.ResultByPatid.length==0){
      
      let result = {
        Resulttest:this.score.toString(),
        Description:null,
        Perioddate:null,
        Numberoftest:1,
        Datetest:new Date(),
        Patientid:this.sharedService.PatientById.patientid
      }
     await this.doctorService.CreateResult(result)
      this.patientService.getResultByPatid(this.sharedService.PatientById.patientid) 
    }
    }
   
  }


  OpenDialog() {

    if (this.score != 0) {
      this.dialog.open(PaymentTestComponent)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you for taking the exam, but you do not need treatment. We wish you good health',
        showConfirmButton: false,
        timer: 5000
      })
      this.route.navigate([""])
    }
  }


}