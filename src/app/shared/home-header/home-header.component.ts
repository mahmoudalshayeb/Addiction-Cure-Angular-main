import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit{

  constructor(public shardService: SharedService, public route: Router,private toster:ToastrService) {


  }
  x:any = localStorage.getItem("loginid")
  Role:any = localStorage.getItem("Role")

  ngOnInit() {


    
    if(this.x!=null){
      this.shardService.GetPatientById(this.x)
      }else{
        this.shardService.PatientById=null
      }
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/Auth/SignIn']);
  }
  Wtostar(){
    this.toster.toastrConfig.positionClass = 'toast-bottom-center';
    this.toster.info("See You Soon")
  }
}
