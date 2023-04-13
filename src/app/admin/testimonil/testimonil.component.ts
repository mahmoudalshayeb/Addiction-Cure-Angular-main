import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-testimonil',
  templateUrl: './testimonil.component.html',
  styleUrls: ['./testimonil.component.css']
})
export class TestimonilComponent implements OnInit{

 
 
@ViewChild("CreateForm") Craete:any;
@ViewChild("UpdateForm") Update:any;
@ViewChild("DeleteForm") Delete:any;
@ViewChild("DetailsForm") Details:any;

constructor(public sharedService:SharedService ,public dialog:MatDialog){}
selected :any


ngOnInit(){
 
  this.sharedService.GetAllTestemonial()
  this.sharedService.GetDoctorByLogInId(localStorage.getItem("loginid"))

}


async publish(id : number){
await  this.sharedService.publish(id)
  this.sharedService.GetAllTestemonial()
 
}


async unpublish(id : number){
 await this.sharedService.unpublish(id)
  this.sharedService.GetAllTestemonial()
 
}

selectedTestemonial = 0;
OpenDeleteDialog(Testemonial_id: number) {
  this.selectedTestemonial = Testemonial_id
  this.dialog.open(this.Delete)
}

async DeleteTestemoiall() {
  await this.sharedService.DeleteTestemoiall(this.selectedTestemonial);
  this.sharedService.GetAllTestemonial()

}




}