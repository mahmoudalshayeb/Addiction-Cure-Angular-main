import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent {
  constructor(private spinner: NgxSpinnerService,public adminService:AdminService,) {}
  
  name:any = new FormControl('');
  
  ngOnInit() {
    this.adminService.GetAllDoctors();
  }

  SearchDoctor(){
   
    this.adminService.GetDocByName(this.name.value)
    
    
  }

  typeDoctor(){
  }
}
