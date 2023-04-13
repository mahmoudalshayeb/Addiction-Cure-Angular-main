import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/patient.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-test',
  templateUrl: './payment-test.component.html',
  styleUrls: ['./payment-test.component.css']
})
export class PaymentTestComponent {
  constructor(public patientService:PatientService , public sharedService:SharedService,private rout:Router , public dialog:MatDialog){}
  Amount:number=0;
  Email:string=""
  paymentform=new FormGroup(
    {
      cardnumber:new FormControl('',[Validators.required]),
      dateCard:new FormControl('',[Validators.required]),
      cvcCard:new FormControl('',[Validators.required])
  }
  )
  x = localStorage.getItem("loginid")?.toString()
  async ngOnInit() {
  await  this.sharedService.GetPatientById(this.x)
    let x:number = parseInt(this.sharedService.PatientById.level1)*5;
    this.Amount = parseInt(this.sharedService.PatientById.level1)*30;
    this.Email=this.sharedService.PatientById.email;
  
    
   }
    
   r=false
  async payment() {
 
     const yearString = this.paymentform.value.dateCard?.slice(0, 4) ?? '';
     const year = parseInt(yearString);
     const MonthString = this.paymentform.value.dateCard?.slice(5) ?? '';
     const month = parseInt(MonthString);
     let PaymentReq = {
       Amount: this.Amount,
       name: this.sharedService.PatientById.firstname + " " + this.sharedService.PatientById.lastname,
       email: this.Email,
       level:this.sharedService.PatientById.level1,
       CategoryName:this.sharedService.PatientById.categoryname,
       Currency: 'usd',
       cvc: this.paymentform.value.cvcCard?.toString(),
       cardNumber: this.paymentform.value.cardnumber?.toString(),
       ExpMonth: month,
       ExpYear: year
     }
    console.log(PaymentReq);
    
    await this.patientService.CreateInvoce(PaymentReq)
     if (this.patientService.PaymentTest != null) {
      this.dialog.closeAll()
       this.rout.navigate(["/request"])
       let date = new Date()
       let createpay = {
         Amount: this.Amount,
         patientid: this.sharedService.PatientById.patientid,
         paydate: new Date(),
       }
       this.patientService.Createpayment(createpay)
     }
     else {
       Swal.fire({
         position: 'center',
         icon: 'error',
         title: 'The card number is not a valid credit card number!',
         showConfirmButton: false,
         timer: 1500
       })
     }
 
   }
 
 
   A?: boolean
   ShowAError() {
     this.A = true;
   }
   B?: boolean
   ShowBError() {
     this.B = true;
   }
   C?: boolean
   ShowCError() {
     this.C = true;
   }
}
