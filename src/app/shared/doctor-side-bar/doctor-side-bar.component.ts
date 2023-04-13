import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-doctor-side-bar',
  templateUrl: './doctor-side-bar.component.html',
  styleUrls: ['./doctor-side-bar.component.css']
})
export class DoctorSideBarComponent {
constructor(public adminService:AdminService , public sharedService:SharedService){}
}
