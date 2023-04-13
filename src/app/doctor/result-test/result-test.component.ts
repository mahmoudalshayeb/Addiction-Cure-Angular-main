import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { DoctorsService } from 'src/app/doctors.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.css']
})
export class ResultTestComponent implements OnInit {

  @ViewChild("UpdateForm") update: any;


  UpdateResultTestForm = new FormGroup({

    resulttestid: new FormControl(""),
    description: new FormControl(""),
    perioddate: new FormControl(""),
    numberoftest: new FormControl(""),
    datetest: new FormControl(""),
    patientid: new FormControl(""),
    resulttest: new FormControl(""),

  })
  constructor(public doctorservice: DoctorsService, private dialog: MatDialog, public adminservice: AdminService, public sharedservice: SharedService , private route:Router) {

  }

  x: any = localStorage.getItem("loginid")?.toString()
  async ngOnInit() {
    if (this.doctorservice.ResultByDocid == null && this.x != null) {
      await this.sharedservice.GetDoctorByLogInId(this.x)
      await this.doctorservice.getResultByDocid(this.sharedservice.DoctorByLoginId.doctodid)
    }
   
  }



  async openUpdateDialog(id: number) {
    await this.doctorservice.getResultTestById(id)
    this.UpdateResultTestForm.patchValue(this.doctorservice.ResultTestById)
    this.dialog.open(this.update)

  }


  async Update() {
    await this.doctorservice.UpdateResultTest(this.UpdateResultTestForm.value)
    this.doctorservice.getResultByDocid(this.sharedservice.DoctorByLoginId.doctodid)

  }


  result(numberoftest:number,patientid:number){
this.doctorservice.answer(patientid,numberoftest)
this.route.navigate(["Doctor/answer"])
  }
}
