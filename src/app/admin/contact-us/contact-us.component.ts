import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  @ViewChild("Deleteform") Delete :any;



  constructor(public sharedservice:SharedService,public adminservice:AdminService,public dialog: MatDialog){

  }

ngOnInit(){
  this.adminservice.getallContactUs();
  this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

}
selectedItem = 0;
OpenDeleteDialog(contacID : number){
  this.selectedItem = contacID;
  this.dialog.open(this.Delete)
}

async DeleteMesg(){
 await this.adminservice.DeleteContactUs(this.selectedItem)
 this.adminservice.getallContactUs();
}


}
