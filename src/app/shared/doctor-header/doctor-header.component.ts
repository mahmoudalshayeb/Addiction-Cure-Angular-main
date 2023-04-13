import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent {
constructor( private route:Router,private toster:ToastrService ){}





logout() {
  localStorage.clear();
  this.route.navigate(['/Auth/SignIn']);
}
Wtostar(){
  this.toster.toastrConfig.positionClass = 'toast-bottom-center';
  this.toster.info("See You Soon Doctor")
}

}


