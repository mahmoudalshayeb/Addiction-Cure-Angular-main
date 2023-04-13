import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DoctorsService } from 'src/app/doctors.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
}) 
export class QuestionsComponent implements OnInit{




  @ViewChild("CreateForm") Create:any;
  @ViewChild("DeleteForm") delete:any;

  data:any;

  constructor(public doctorservice : DoctorsService,private dialog :MatDialog,public sharedservice:SharedService,private http: HttpClient){
//get request from web api
this.http.get('https://therichpost.com/testjsonapi/users/').subscribe(data => { this.data = data;
   
setTimeout(()=>{   
  $('#datatableexample').DataTable( {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    lengthMenu : [5, 10, 25]
} );
}, 1);
      }, error => console.error(error));

  }

  async ngOnInit(){

    if(this.doctorservice.questionss.quastionid==null){
    await this.doctorservice.GetAllQuastionss()
    }
   

    this.sharedservice.GetDoctorByLogInId(localStorage.getItem("loginid"))

   }

   

  CreateQuestionsForm = new FormGroup({

    quastion : new FormControl("",Validators.required),
    categoryid : new FormControl("",Validators.required)


  })


  



  OpenCreateDialog(){
    this.dialog.open(this.Create)
  }

  async CreateQ(){
   await this.doctorservice.CreateQuastion(this.CreateQuestionsForm.value)
    this.doctorservice.GetAllQuastionss();
  }

  




 selectedItem=0
  OpenDeleteDialog(id:number){
    this.dialog.open(this.delete)
    this.selectedItem=id;
  }

  async DeleteQ(){
   await this.doctorservice.DeleteQuestion(this.selectedItem);
   this.doctorservice.GetAllQuastionss();
  }
}
