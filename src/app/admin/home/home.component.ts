import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public sharedservice: SharedService, public dialog: MatDialog,public route:Router) {

  }
 async ngOnInit() {
  await  this.sharedservice.GetAllHome();
    this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

  }
  OpenUpdatePage() {
    this.route.navigate(["Admin/HomeManagment"])
  }






}
